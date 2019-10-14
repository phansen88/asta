const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: [
        path.resolve(__dirname, './src/sass/main.scss'),
    ],
    output: {
        path: path.resolve(__dirname, './dist/css'),
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '/styles.css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),{
            apply(compiler) {
              compiler.hooks.shouldEmit.tap('Remove styles from output', (compilation) => {
                delete compilation.assets['main.js'];  // Remove asset. Name of file depends of your entries and 
                return true;
              })
            }
          }
    ],
    module: {
        rules: [
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
                    'sass-loader'
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: '../fonts'
                    }
                  }
                ]
              }
        ],
    },
};