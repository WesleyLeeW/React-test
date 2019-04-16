'use strict'

const path = require('path');

module.exports = {
    base:{
        cssModule: true,
        cssModuleExcludePath:/public/,
    },
    dev: {
        index: path.resolve(__dirname,'../public/index.html'),
        assetsSubDirectory: 'static',
        assetsPublicPath:'/',
        proxyTable:{},
        host:"localhost",
        port:8080,
        autoOpenBrower:true,
    },
    build:{
        index: path.resolve(__dirname,'../public/index.html'),
        assetsRoot: path.resolve(__dirname,'../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath:'/',
        productionGzip:true,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report,
    }
}