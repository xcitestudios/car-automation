'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
        main: "./s3-src/js/main.tsx",
    },
    output: {
        path: path.resolve(__dirname, 'dist/s3-src'),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './s3-src/index.html'),
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(),
    ]
};