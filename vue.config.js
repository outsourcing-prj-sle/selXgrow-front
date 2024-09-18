const { defineConfig } = require('@vue/cli-service');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  configureWebpack: {
    plugins: [
      new ESLintPlugin({
        // 플러그인 생성자를 사용하여 extensions 옵션 설정
        extensions: ['js', 'vue', 'json'],
      }),
    ],
    resolve: {
      alias: {
        '@': require('path').resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        // {
        //   test: /\.vue$/,
        //   loader: 'vue-loader',
        // },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
          exclude: /node_modules/,
        },
      ],
    },
  },
  devServer: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_PRODUCTION === 'live' ? process.env.VUE_APP_URI_LIVE :
        (process.env.VUE_APP_PRODUCTION === 'inner' ? process.env.VUE_APP_URI_INNER_DEV : process.env.VUE_APP_URI_OUTER_DEV),
        changeOrigin: true,
      },
    },
  },
});
