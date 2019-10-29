// Webpack uses this to work with directories
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {
    
    // Path to your entry point. From this file Webpack will begin his work
    entry: path.resolve(__dirname, 'src/js/main.js'),
    
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(__dirname, './'),
                            }
                        }
                    },
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                exclude: /(sass)/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: './img',
                            publicPath: '../img' 
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: './fonts',
                            publicPath: '../fonts' 
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "/css/styles.css"
        }),
        new CopyPlugin([
          { from: 'src/img', to: 'img' }
        ]),
    ],
    
    mode: 'development'
};