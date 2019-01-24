const webpack = require("webpack");
const PATH = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development', // 打包模式：production，development，none
    entry: {
        main: "./src/javascript/app.js",
        index: "./src/javascript/admin.js"
    },
    // 出口
    output: {
        filename: '[name].js', // 打包输出文件的名字
        // 输出路径，路径以配置文件为基准的
        path: PATH.resolve(__dirname, '../dist')
    },
    devtool: 'true',
    // 静态服务器
    devServer: {
        port: 3000,
        inline: true, // 自动刷新
        open: true, // 自动打开浏览器
    },
    plugins: [
        new webpack.BannerPlugin("这里是打包文件头部注释"),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            template: './src/admin.html',
            filename: 'admin.html',
            chunks: ['admin']
        }),
        new CopyWebpackPlugin([{
            from: PATH.resolve(__dirname, '../static'),
            to: PATH.resolve(__dirname, '../dist/static')
        }])
    ],
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [ // loader从后向前使用
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [ // loader从后向前使用
                    {
                        loader: 'string-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    }
}


// 多入口 单出口 [入口文件的路径...] array， output指定输出名字
// 打包的时候要主要路径，在package.json的script中 要配置文件路径
// "build": "webpack --config ./config/webpack.config.dev.js"
