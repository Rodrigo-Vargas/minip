var path = require("path");
module.exports = {
  entry: "./app.js",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: "bundle.js"
  },
  devServer:
  {
    inline: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/, 
        loader: "babel", 
        query:
        {
          presets: ['es2015', 'react']
        }  
      }      
    ]
  }
};