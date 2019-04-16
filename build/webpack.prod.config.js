const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const HTMLwebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetPlugin = require("optimize-css-assets-webpack-plugin");
const config = require('../config');
const utils = require('./utils');
const webpackConfig = merge(baseWebpackConfig,{
    mode :"production",
    output:{
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash:16].js'),//hash值长度设为16，否则默认为20
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    module:{
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true,
            cssModule:config.base.cssModule,
            cssModuleExcludePath:config.base.cssModuleExcludePath
    })
    },
     optimization:{    //优化代码
        minimizer:[
            new UglifyJsPlugin
        ],
        splitChunks:{
            chunks:'all',
            minChunks:1,
            minSize:0,
            cacheGroups:{
                framework:{
                    priority:200,
                    test:"framework",
                    name:"framework",
                    enforce:true,
                    reuseExistingChunk:true
                },
                vendor:{
                    priority:10,
                    test:/node_modules/,
                    name:"vendor",
                    enforce:true,
                    reuseExistingChunk:true
                }
            }
        },
        minimizer:[
            new UglifyJsPlugin(),
            new OptimizeCssAssetPlugin({
                cssProcessorOptions:true ?{
                    map:{inline:false}
                } : {}
            })
        ]
     },
    
    plugins: [
        new HTMLwebpackPlugin ({
            template:config.build.index,
            inject:"body",
            minify:{
                removeComments:true,
                collapseWhitespace:true,
                removeAttributeQuotes:true
            }
        }),
    new CleanWebpackPlugin([config.build.assetsRoot],{allowExternal:true}),
     new MiniCssExtractPlugin ({
        filename:'css/[name].[hash].css',
        chunkFilename:'css/[id].[hash].css',
    })
    ]
})

if(config.build.productionGzip){
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          config.build.productionGzipExtensions.join('|') +
          ')$'
        ),
        threshold: 10240,
        minRatio: 0.8
      })
    )
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
  }

module.exports = webpackConfig;