const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//to create css file because it will be static in css 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


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
                //use: ['style-loader', 'css-loader'],
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', 
            filename: 'index.html',
            chunks: ['logic'], 
        }),
        new HtmlWebpackPlugin({
            template: './src/search.html',  
            filename: 'search.html',
            chunks: ['search'], 
        }),
        new MiniCssExtractPlugin({
        filename: '[name].css',
        }),
    new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['logic'],
        }),
    new HtmlWebpackPlugin({
        template: './src/search.html',
        filename: 'search.html',
        chunks: ['search'],
    }),
    ],
    devServer: {
        static: './dist',
        port: 9000,
        open: true,
        compress: true,
    },
};
