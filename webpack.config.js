module.exports = {
  entry: ['./client/index.js', 'webpack-dev-server/client?http://0.0.0.0:8080'],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: '/client/bundle.js',
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    disableHostCheck: true,
  },
};
