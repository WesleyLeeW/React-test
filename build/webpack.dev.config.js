const path = require("path");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = require('../config')
const utils = require('./utils')
module.exports = merge(baseWebpackConfig, {
    mode: "development",
    // output:{
    //     filename:"js/[name].[hash:16].js",
    // },
    module:{
        rules: utils.styleLoaders({ 
            sourceMap: config.dev.cssSourceMap, 
            usePostCSS: true,
            cssModule:config.base.cssModule,
            cssModuleExcludePath:config.base.cssModuleExcludePath
    })
    },
    plugins:[
        new HTMLWebpackPlugin({
            template: config.dev.index,
            inject:"body",
            minify:{
                html5:true
            },
            hash:false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin ({
            filename:'css/[name].[hash].css',
            chunkFilename:'css/[id].[hash].css',
        })
    ],
    devServer:{
        port:config.dev.port,
        host:config.dev.host,
        contentBase:path.join(__dirname,'../public'),
        compress:true,
        historyApiFallback:true,
        hot:true,
        https:false,
        noInfo:true,
        open:config.dev.autoOpenBrower,
        proxy:config.dev.proxyTable,
    }
})