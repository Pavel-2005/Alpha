let
    path = require ('path'),
    HtmlWebpackPlugin = require ('html-webpack-plugin'),
    MiniCssExtractPlugin = require ('mini-css-extract-plugin'),
    { CleanWebpackPlugin } = require ('clean-webpack-plugin'),
    CopyWebpackPlugin = require ('copy-webpack-plugin'),
    autoprefixer = require ('autoprefixer'),
    cssnano = require('cssnano')

const PATHS = {
    src: path.join (__dirname, './src'),
    dist: path.join (__dirname, './dist'),
    assets: 'assets/'
}

module.exports = {
    context: PATHS.src,
    entry: {
        index: `${PATHS.src}/${PATHS.assets}js/index.js`
    },
    output: {
        filename: `${PATHS.assets}js/[name].[hash].js`,
        path: PATHS.dist
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    resolve: {
        extensions: ['.js', '.sass', '.scss', '.pug', '.svg', '.png', '.jpg']
    },
    plugins: [
        new HtmlWebpackPlugin ({
            template: `${PATHS.src}/pug/index.pug`
        }),
        new MiniCssExtractPlugin ({
            filename: `${PATHS.assets}css/[name].[hash].css`
        }),
        new CleanWebpackPlugin (),
        new CopyWebpackPlugin ({
            patterns: [
                {
                    from: `${PATHS.assets}/images`,
                    to: `${PATHS.assets}/images`,
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer ({
                                        overrideBrowserslist: ['ie >= 5', 'last 4 version']
                                    }),
                                    cssnano ()
                                ]
                            }
                        }
                    },
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer ({
                                        overrideBrowserslist: ['ie >= 5', 'last 4 version']
                                    }),
                                    cssnano ()
                                ]
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: ['file-loader']
            }
        ]
    }
}