const path = require('path')
// 导入每次删除文件夹的插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry:  path.join(__dirname, './src/index.js'),
    devtool: 'cheap-module-source-map',
    output: {
        path: path.join(__dirname, './lib'),
        filename: 'index.js',
        libraryTarget: 'umd',  //发布组件专用
        library: 'CyclicRoll',
    },
    plugins: [ // 插件
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            },
            { 
                test: /\.js$/, 
                use: 'babel-loader', 
                exclude: /node_modules/ 
            },
            { 
                test: /\.(jpg|png|gif|bmp|jpeg)$/, 
                use: 'url-loader?limit=5000&name=images/[hash:8]-[name].[ext]'
            },
            { 
                test: /\.(ttf|eot|svg|woff|woff2)$/, 
                use: 'url-loader?limit=5000&name=images/[hash:8]-[name].[ext]' 
            },
        ]
    }
}