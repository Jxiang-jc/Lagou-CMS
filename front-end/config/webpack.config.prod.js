const PATH = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const CopyWebpackPlugin = require('copy-webpack-plugin')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");


module.exports = {
    mode: 'production', // 打包模式：production，development，none
    // 入口 打包的入口文件，模块化的根模块
    entry: {
        main: ['./src/javascripts/app'],
        admin: ['./src/javascripts/admin'],
    },
    // 出口
    output: {
        filename: '[name]-[hash:6].js', // 打包输出文件的名字
        // 输出路径，路径以配置文件为基准的
        path: PATH.resolve(__dirname, '../dist')
    },
    optimization: {
        minimizer: [
          new OptimizeCSSAssetsPlugin({})
        ]
      },
    plugins: [ // 实现某些特定的功能
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
            to:  PATH.resolve(__dirname, '../dist/static')
        }]),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "styles/[name]-[hash:6].css"
        })
    ],
    module: {
        rules: [ // 可以设置模块的规则来为这些模块使用loader
            
            {
                test: /\.(css|scss)$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader',  { loader: 'sass-loader'} ]
                             
            },
            {
                test: /\.html$/,
                use: [ // loader从后向前使用
                    { loader: 'string-loader' }                
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192
                    }
                  }
                ]
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
    },
    // 替换项目中使用的模块为外链引入之后， 取消模块中的加载 
    // externals: {
    //     // 页面中已经引入jq了，那么再模块中 import 进来的 $, 让让它们变成window.jQuery
    //     'jquery': 'window.jQuery'
    // }
}

