const path = require('path');

module.exports = {
    entry: './src/main.ts',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'eval-source-map',
    watchOptions: {
        ignored: [
            '/node_modules/',
            '**.js',
            '**.d.ts'
        ]
    }
};