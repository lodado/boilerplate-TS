const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');

const jsRoute = './frontend';

const imgPath = jsRoute + '/images/';
const jsPath = jsRoute + '/javascripts/';
const cssPath = jsRoute + '/stylesheets/';
const ejsPath = jsRoute + '/ejs/';
const hbsPath = jsRoute + '/hbs/';

const imgs = glob.sync(imgPath + '*');
const js = [jsPath + 'app.js'];
const ts = [jsPath + 'app.ts'];

const hbs = glob.sync(hbsPath + '*.hbs');

const css = glob.sync(cssPath + '*.css');
const sass = glob.sync(cssPath + '*.sass');
const scss = glob.sync(cssPath + '*.scss');

console.log(__dirname);

module.exports = {
  mode: 'development',
  devtool: 'source-map',

  // enntry file
  entry: {
    //main: ['@babel/polyfill', ...ts],
    main: [...ts],
  },
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.join(__dirname, 'bundle'),
    filename: 'bundle.js',
    publicPath: './',
    pathinfo: false,
  },

  resolve: {
    alias: {
      '@Component': path.resolve(__dirname, jsPath, 'component'),
      '@Scss': path.resolve(__dirname, cssPath),
      '@Interface': path.resolve(__dirname, jsPath, 'interface'),
      '@Images': path.resolve(__dirname, jsPath, 'images'),
      '@View': path.resolve(__dirname, jsPath, 'view'),
    },

    extensions: ['.jsx', '.sass', '.scss', '.css', '.tsx', '.ts', '.js'],
  },

  plugins: [
    /*
    new HtmlWebpackPlugin(
      {

        filename : "index.html",
        title: 'Hello Webpack Project!',
        template: ejsPath+'/index.ejs',

      }),
    */

    new HtmlWebpackPlugin({
      //    hash : true,
      filename: 'test.ejs',
      chunks: ['main'], // entry에서 해당 리스트만 포함
      template: ejsPath + 'index.ejs',
    }),

    new CleanWebpackPlugin({
      protectWebpackAssets: true,
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      linkType: 'text/css',
    }),

    new webpack.ProgressPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },

      /*
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
      */

      /*
      {
        test: /\.js/,
        include: [path.resolve(jsPath)],

        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      */

      {
        test: /\.s[ac]ss$/i,
        use: [
          //"style-loader",
          MiniCssExtractPlugin.loader,

          {
            loader: 'css-loader',
            options: { url: true },
          },

          {
            loader: 'resolve-url-loader',
            options: { removeCR: true },
          },
          {
            loader: 'sass-loader',
            options: {
              webpackImporter: true,
              //additionalData: `@import "./frontend/stylesheets/style.scss";`,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
