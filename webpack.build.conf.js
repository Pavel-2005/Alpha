let 
    { merge } = require ('webpack-merge'),
    glob = require ('glob'),
    ImageminWebpackPlugin = require ('imagemin-webpack-plugin').default,
    baseWebpackConfig = require('./webpack.base.conf')

let buildWebpackConfig = merge (baseWebpackConfig, {
    mode: 'production',
    plugins: [
        new ImageminWebpackPlugin ({
            test: /\.(svg|png|jpg)$/
        }),
        new ImageminWebpackPlugin ({
            externalImages: {
                context: 'src',
                sources: glob.sync ('src/assets/images/**/*.png'),
                destination: 'src/assets/images',
                fileName: '[path][name].[ext]'
            },
            optipng: {
                optimizationLevel: 9,
                interlaced: true
            },
            pngquant: {
                strip: true,
                quality: ['50-70']
            }
        })
    ]
})

module.exports = new Promise (resolve => {
    resolve (buildWebpackConfig)
})