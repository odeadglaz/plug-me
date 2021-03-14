const PLUGIN_NAME = 'ExposedTypesPlugin';
const IMPORT_REGEXP = /import(?:["'\s]*([\w*{}\n, ]+)from\s*)?["'.\s]*([@\w/_-]+)["'\s].*/;
const RELATIVE_IMPORT_REGEXP = /from (?:["'\s])(\.\.?)/;
const DECLARATION_FILE_SUFFIX = 'd.ts';
const EXCLUDED_LINES = [
    'export {}'
];


module.exports = {
    PLUGIN_NAME,
    IMPORT_REGEXP,
    RELATIVE_IMPORT_REGEXP,
    DECLARATION_FILE_SUFFIX,
    EXCLUDED_LINES
}