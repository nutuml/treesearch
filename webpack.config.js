const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    devtool: 'source-map',
    devServer: {
        static: './',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.m?js/,
          type: "javascript/auto",
        },
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'treesearch.js',
      path: path.resolve(__dirname, 'dist'),
      library: {
        name: 'treesearch',
        type: 'umd',
        export: 'default',
      },
    },
  };
  