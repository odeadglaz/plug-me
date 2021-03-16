const path = require( 'path' );
const fs = require('fs');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const ExposedTypesPlugin = require('./ExposedTypesPlugin');

const excludedDirectories = ['configuration', 'base'];
const root = `${process.cwd()}/plugins`;

const pluginsEntries = () => fs.readdirSync(
    path.resolve(root), { withFileTypes: true }
)
    .filter((file) => file.isDirectory())
    .filter((file) => !excludedDirectories.includes(file.name))
    .map((file) => file.name)
    .reduce((acc, fileName) => {
        const pluginRoot = `${root}/${fileName}`;
        try {
            const { version } = require(`${pluginRoot}/config.json`);
            return {
                ...acc,
                [`${fileName}.${version}`]: `${pluginRoot}/index.ts`
            }
        } catch(e) {
            console.log('Failed here', e)
            return acc;
        }
    }, {});

module.exports = {
    mode: 'production',
    target: 'node',
    entry: pluginsEntries(),
    output: {
        path: path.resolve(root, '../dist' ),
        filename: 'plugins/[name].js',
        libraryTarget: 'umd',
        globalObject: "Function('return this')()"
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    externals: require('../externals'),
    devtool: 'source-map',
    plugins: [
        new WebpackAssetsManifest({
            publicPath: true,
            output: 'plugins.manifest.json'
        }),

    ],
    // loaders
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.plugins.json'
                    },
                },
                exclude: /node_modules/,
            }
        ]
    }
};
