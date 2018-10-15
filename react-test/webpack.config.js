const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const extractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  // 定义入口文件
  entry: path.resolve(__dirname, "src/index.js"),
  //定义出口文件
  output: {
    path: __dirname + "/dist/",
    filename: "bundle.[hash].js"
  },
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    inline: true,
    hot: true,
    contentBase: __dirname + "/dist",
    port: 8099
  },
  module: {
    //定义loader
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      // {
      //   test: /\.(sass|scss|css)$/,
      //   use: ["style-loader", "css-loader",  "postcss-loader", "sass-loader"]
      // },
      // {
      //   test: /\.(scss|css)$/,
      //   use: [
      //     { loader: 'style-loader' },
      //     { loader: 'css-loader' },
      //     { loader: 'postcss-loader?sourceMap'},
      //     { loader: 'sass-loader' },
      //   ]
      // },
      {
        test: /\.css$/,
        // 不分离的写法
        // use: ["style-loader", "css-loader"]
        // 使用postcss不分离的写法
        // use: ["style-loader", "css-loader", "postcss-loader"]
        // 此处为分离css的写法
        /*use: extractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader",
            // css中的基础路径
            publicPath: "../"

        })*/
        // 此处为使用postcss分离css的写法
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader"],
          // css中的基础路径
          publicPath: "../"
        })
      },
      {
        test: /\.(scss|sass)$/,
        // sass不分离的写法，顺序不能变
        // use: ["style-loader", "css-loader", "sass-loader"]
        // 分离的写法
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      }
    ]
  },
  // //添加组件
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/index.html" //new 一个这个插件的实例，并传入相关的参数
    }),
    new webpack.HotModuleReplacementPlugin(), //热加载插件
    // 分离css插件参数为提取出去的路径
    new extractTextPlugin("css/index.css"),
    new CleanWebpackPlugin("dist/*.*", { // 清除每次打包的文件
      root: __dirname,
      verbose: true,
      dry: false
    })
  ]
};