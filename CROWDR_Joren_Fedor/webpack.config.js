const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: 'dist'
    },
    module: {
        rules: [
            {
                test: /\.(scss)$/,
                use: [{
                    loader: 'style-loader', // inject CSS to page
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS modules
                }, {
                    loader: 'postcss-loader', // Run post css actions
                    options: {
                        postcssOptions: {
                            plugins: function () { // post css plugins, can be exported to postcss.config.js
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }
                }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                }]
            },

        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./homePage.html"
        }),
    ]
}

// const HtmlWebPackPlugin = require("html-webpack-plugin");
//
// module.exports = {
//     module: {
//         rules: [
//             {
//                 test: /\.html$/,
//                 use: [
//                     {
//                         leader: "html-loader",
//                         options: {minimize: true}
//                     }
//                 ]
//             },
//         ]
//     },
//     plugins: [
//         new HtmlWebPackPlugin({
//             template: "./src/index.html",
//             filename: "index.html"
//         }),
//     ]
//
// }
