const {defineConfig} = require('@vue/cli-service')
const CompressionPlugin = require("compression-webpack-plugin")
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
module.exports = defineConfig({
    transpileDependencies: true,
    assetsDir: 'static',
    publicPath: '/oj',
    chainWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            config.plugin('compressionPlugin')
                .use(new CompressionPlugin({
                    test: productionGzipExtensions, // 匹配文件名
                    threshold: 10240, // 对超过10k的数据压缩
                    deleteOriginalAssets: false // 不删除源文件
                }))
        }
    },
    devServer: {
        proxy:{
            '/api/':{
                target:'http://xsyd.zxlong.love:13000/',
                changeOrigin:true,
                pathRewrite:{
                    '^/api/':''
                }
            }
        }
    }
})
