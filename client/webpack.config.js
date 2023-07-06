const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      editor: './src/js/editor.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // set up HTML webpack plugin
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Wonder',
      }),
      // set up service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      // set up manifest file
      new WebpackPwaManifest({
        name: 'Webpack Wonder',
        short_name: 'Webpack',
        description: 'A simple note taking app',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: ['96x96', '128x128', '192x192', '256x256', '384x384', '512x512'], 
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
          use: {
            loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime'], 
        }, 
        },
        },
      ],
    },
  };
};
