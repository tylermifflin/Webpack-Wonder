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
        name: 'Jate',
        short_name: 'Jate',
        description: 'A simple note taking app',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/assets/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          },
          {
            src: path.resolve('src/assets/large-icon.png'),
            size: '1024x1024', // you can also use the specifications pattern
          },
          {
            src: path.resolve('src/assets/maskable-icon.png'),
            size: '1024x1024',
            purpose: 'maskable',
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
