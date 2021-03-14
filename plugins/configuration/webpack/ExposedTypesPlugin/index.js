const fs = require('fs');
const {
    PLUGIN_NAME,
    IMPORT_REGEXP,
    RELATIVE_IMPORT_REGEXP,
    DECLARATION_FILE_SUFFIX,
    EXCLUDED_LINES
} = require('./constants');

/**
 * The webpack compilation name to assets map
 * @type {Object<Source>}
 */
const declarationFiles = {};

/**
 * An array of swapped inline import statements
 * @type {String[]}
 */
const processedImportFiles = [];

const externalImports = new Set();

/**
 * Processing import statements by the following strategy:
 * 1) External imports would kep at top of file as is.
 * 2) Internal imports would be inline replace by their original import statement.
 * @param {String} statement - The import statement to process
 * @return {String}
 */
const processImportStatement = (statement) => {
    const [
        , //line itself
        , //import groups
        source
    ] = statement.match(IMPORT_REGEXP);

    if (!source) {
        throw new Error(`Failed to identifier import statement source - ${statement}`);
    }

    const isExternalImport = !RELATIVE_IMPORT_REGEXP.test(statement);
    if (isExternalImport) {
        externalImports.add(statement);

        // Externals would be output at top of file.
        return '';
    }

    // Removing relative import prefix
    const sourceDeclaration =  [
        source.startsWith('/') ? source.replace('/', '') : source,
        DECLARATION_FILE_SUFFIX
    ].join('.');

    // Ignores if already been processed
    if(processedImportFiles.includes(sourceDeclaration)) return '';

    processedImportFiles.push(sourceDeclaration);

    // Iterate next imported declaration asset.
    return processDeclarationAsset(declarationFiles[sourceDeclaration]);
}

/**
 * Processing webpack complied declaration asset.
 * @param {Source} asset - The compiled webpack asset source item.
 * @return {String}
 */
const processDeclarationAsset = (asset) => {
    const lines = asset.source()
        .split('\n')
        .filter((line) => EXCLUDED_LINES.some((excluded) => !line.includes(excluded)));

    const content = lines.map((line) => {
        if (line.startsWith('import')) return processImportStatement(line);

        return line;
    });

    return content
        .filter(Boolean)
        .join('\n');
}

/**
 * @typedef {Object} ExposedTypesPluginOptions
 * @property {String} output - The output folder path.
 * @property {String} filename - The generated file name.
 * @property {String} typesEntryName - The declaration types entry file name.
 */

class ExposedTypesPlugin {

    /**
     *
     * @param {ExposedTypesPluginOptions} options
     */
    constructor(options = {}) {
        this.output = options.output;
        this.filename = options.filename;
        this.typesEntryName = options.typesEntryName
            .replace('ts', DECLARATION_FILE_SUFFIX);
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync(
            PLUGIN_NAME,
            (compilation, callback) => {
                this.generateDeclaration(compilation.assets);
                callback();
            }
        );
    }

    generateDeclaration(assets) {
        Object.entries(assets)
            .filter(([fileName]) => fileName.endsWith(DECLARATION_FILE_SUFFIX))
            .forEach(([fileName, assetSource]) => {
                declarationFiles[fileName] = assetSource;
            });

        if (!declarationFiles[this.typesEntryName]) {
            throw new Error(`Could not find exposed declaration file under complied assets - ${this.typesEntryName}`);
        }

        const exposedDeclaration = declarationFiles[this.typesEntryName];
        const declarationContent = processDeclarationAsset(exposedDeclaration);

        // Adding external imports
        const combinedContent = [
            ...externalImports,
            declarationContent
        ].join('\n')

        const outputFilePath = `${this.output}/${this.filename}.${DECLARATION_FILE_SUFFIX}`
        fs.writeFileSync(outputFilePath, combinedContent, 'utf-8');
    }
}

module.exports = ExposedTypesPlugin;
