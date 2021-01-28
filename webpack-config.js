'use strict';

const path = require('path');

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
        main: "./s3-src/js/app.tsx",
    },
    output: {
        path: path.resolve(__dirname, 'dist/s3-src/js'),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
        ],
    }
};