const webpack = require("webpack");
const PATH = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development', // 打包模式：production，development，none
    // 入口
    entry: {
        // 这里的路径我理解是从package.json为起始
        main: ['./src/javascript/index'],
        admin: ['./src/javascript/admin']
    },
    // 出口
    output: {
        filename: '[name].js', // 打包输出文件的名字
        // 输出路径，路径以配置文件为基准的
        path: PATH.resolve(__dirname, '../dist')
    },
    devtool: 'true',
    // 静态服务器
    // 我的理解: devServer会根据入口和出口文件进行一个隐式打包, 它是存在内存中,
    // 所以我们看不到打包后的文件, 所以, 入口和出口文件要写对
    devServer: {
        // 让服务器从这两个目录中响应资源, 默认是根目录下(src)
        contentBase:PATH.resolve(__dirname, '../dist'), // 
        compress: true, // 压缩
        port: 3000,
        inline: true, // 自动刷新
        open: true, // 自动打开浏览器
        proxy: { // 代理api请求到api server
            '/api': {
                target: 'http://localhost:1239',
                changeOrigin: true
            }
        }
    },
    plugins: [
        new webpack.BannerPlugin("这里是打包文件头部注释"),
        // 可以打包html文件 如果实现多页面开发的话，就需要使用多个 HtmlWebpackPlugin
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
        // 将静态资源目录复制到开发输出目录
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
