const path = require('path');
const config = require('../config')
const APP_PATH = path.resolve(__dirname, '../app');
const DIST_PATH = path.resolve(__dirname, '../dist');
module.exports = {
    entry: {
        app: './app/index.js'
    },    
    output: {
        path:config.build.assetsRoot,
        filename:'[name].js',
        publicPath:process.env.NODE_ENV === 'production' 
        ? config.build.assetsPublicPath 
        : config.dev.assetsPublicPath
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: "babel-loader",
                include: APP_PATH
            }
        ]
    }
};