const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//to create css file because it will be static in css 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


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
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
                {
                test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
            filename: '[name].css', // nome del file CSS finale
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/style/img', to: 'img' },
            ],
        }),
    ],
    devServer: {
        static: './dist',
        port: 9000,
        open: true,
        compress: true,
    },
};




/*
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/js/index.js',
        search: './src/js/search.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/nome-repo/',
        clean: true,
    },
    module: {
        rules: [
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
            test: /\.(png|jpe?g|gif|svg)$/i,
            type: 'asset/resource',
            generator: {
            filename: 'img/[name][ext]',
            },
        },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
        filename: '[name].css',
        }),

        new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['index'],
        }),

        new HtmlWebpackPlugin({
        template: './src/search.html',
        filename: 'search.html',
        chunks: ['search'],
        }),
    ],
};
*/