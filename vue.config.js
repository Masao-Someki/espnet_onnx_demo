const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: 'https://masao-someki.github.io/espnet_onnx_demo/'
})
