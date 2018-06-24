//Konfiguracja Webpack

var path = require("path");
module.exports = {
  entry:"./js/ebayFetch.jsx",
  output: {filename: "./dist/js/out.js"},
  devServer: {
      inline: true,
      contentBase: './',
      port: 3001,
      historyApiFallback: true
  },
  mode: "development", watch: true, devtool: "#eval-source-map",
  module: {
    rules: [{
      test: /\.jsx$/,
      exclude: /node_modules/, use: {
        loader: "babel-loader", options: {
          presets: ["es2015","stage-2", "react"] }
} },
{
  test: /\.scss$/,
  use: [
      "style-loader", // creates style nodes from JS strings
      "css-loader", // translates CSS into CommonJS
      "sass-loader" // compiles Sass to CSS
  ]
}

]
} }