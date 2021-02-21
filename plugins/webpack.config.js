const path = require( 'path' );

module.exports = {
    mode: 'production',
    target: 'node',
    entry: path.resolve( __dirname, './index.ts' ),
    output: {
        path: path.resolve( __dirname, '../dist/plugins' ),
        filename: 'index.js',
        libraryTarget: 'umd',
        globalObject: "Function('return this')()"
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    devtool: 'source-map',
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