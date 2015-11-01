var fp = require('path')

module.exports = {
    entry: "./src/index.js",
    output: {
        path: fp.join(__dirname, 'dist'),
        filename: "bundle.js"
    },
    // module: {
    //     loaders: [
    //         { test: /\.css$/, loader: "style!css" }
    //     ]
    // }
};