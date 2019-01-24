const path = require('path')

// 默认在dist文件生成对应的html文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 复制静态文件到dist文件
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development', // 打包模式：production，development，none
    // 入口 打包的入口文件，模块化的根模块
    entry: {
        main: './src/javascript/app',
        admin: './src/javascript/admin'
    },
    // 出口
    output: {
        filename: '[name].js', // 打包输出文件的名字
        // 输出路径，路径以配置文件为基准的
        path: Path.resolve(__dirname, './dist'),
        devtool: 'true',
        devServer: {
            
        }
    }
}