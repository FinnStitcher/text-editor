const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');

const path = require('path');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      assetModuleFilename: '[name].[ext]'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Just Another Text Editor',
        background_color: '#7eb4e2',
        theme_color: '#7eb4e2',
        start_url: './',
        publicPath: './',
        icons: [
            {
                src: path.resolve('src/images/logo.png'),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: path.join('assets', 'icons')
            }
        ],
        fingerprints: false
      }),
      new InjectManifest({
        swSrc: './sw.js',
        swDest: './dist/service-worker.js'
      })
    ],
    module: {
      rules: [
        {
            test: /\.(png|jpg|jpeg|svg|gif)$/i,
            type: 'asset/resource'
        },
        {
            test: /\.css/i,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.m?js$/i,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', {targets: "defaults"}]
                    ]
                }
            }
        }
      ],
    },
  };
};
