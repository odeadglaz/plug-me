const path = require( 'path' );
const fs = require('fs');
const WebpackAssetsManifest = require('webpack-assets-manifest');

const pluginsEntries = () => fs.readdirSync(
    path.resolve(__dirname), { withFileTypes: true }
)
    .filter((file) => file.isDirectory())
    .map((file) => file.name)
    .reduce((acc, fileName) => ({
        ...acc,
        [fileName]: `${process.cwd()}/plugins/${fileName}/index.ts`
    }), {});

module.exports = {
    mode: 'production',
    target: 'node',
    entry: pluginsEntries(),
    output: {
        path: path.resolve( __dirname, '../dist/plugins' ),
        filename: '[name].js',
        libraryTarget: 'umd',
        globalObject: "Function('return this')()"
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    devtool: 'source-map',
    plugins: [
        new WebpackAssetsManifest({
            publicPath: true,
            output: 'plugins.json'
        })
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