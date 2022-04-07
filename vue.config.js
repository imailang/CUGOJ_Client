const { defineConfig } = require('@vue/cli-service')
const MonacoEditorWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir:'static',
  publicPath:'/OJ',
  configureWebpack:{
    plugins:[
        new MonacoEditorWebpackPlugin()
    ]
  }
})
