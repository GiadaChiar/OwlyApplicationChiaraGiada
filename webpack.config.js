const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        logic: './src/js/logic.js',
        search: './src/js/search.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    mode: 'development',
    module: {
        rules: [
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['logic'], // includi solo logic.bundle.js
        }),
        new HtmlWebpackPlugin({
        template: './src/search.html',
        filename: 'search.html',
        chunks: ['search'], // includi solo search.bundle.js
        }),
    ],
    devServer: {
        static: './dist',
        port: 9000,
        open: true,
        compress: true,
    },
};
