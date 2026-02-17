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
                //QUANDO HAI FINITO RIMRTTILO E TOGLI QUELLO SOTTO
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                //use: ['style-loader', 'css-loader', 'sass-loader'],
            
            },
                {
                test: /\.css$/i,
                //QUANDO HAI FINITO RIMRTTILO E TOGLI QUELLO SOTTO
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        //use: ['style-loader', 'css-loader'], 
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
                { from: 'src/menu.html', to: 'menu.html'},
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

