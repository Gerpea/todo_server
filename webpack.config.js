const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: ['./src/index.js'],
  target: 'node',
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist/',
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
}
