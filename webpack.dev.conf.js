let 
    { merge } = require ('webpack-merge'),
    webpack = require ('webpack'),
    baseWebpackConfig = require('./webpack.base.conf')

let devWebpackConfig = merge (baseWebpackConfig, {
    mode: 'development',
    devServer: {
        port: 3000
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.SourceMapDevToolPlugin ({
            filename: '[file].map'
        })
    ]
})

module.exports = new Promise (resolve => {
    resolve (devWebpackConfig)
})