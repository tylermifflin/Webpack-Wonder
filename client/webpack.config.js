const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // set up HTML webpack plugin
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: true,
        chunks: ['main'],
        filename: 'index.html',
      }),
      // set up service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'sw.js',
      }),
      // set up manifest file
      new WebpackPwaManifest({
        name: 'Webpack Wonder',
        short_name: 'Webpack Wonder',
        description: 'A simple note taking app',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      // add CSS loaders
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // add babel loader
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        }, 
      ],
    },
  };
};
