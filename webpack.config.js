var path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname,'/dist'),
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
            test: /\.js(x)?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env']
                    ]
                    }
            }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  'style-loader',
                  // Translates CSS into CommonJS
                  'css-loader',
                  // Compiles Sass to CSS
                  'sass-loader',
                ],
            },
            {
              test:/\.css$/,
              use:['style-loader','css-loader']
          }

        ],
    },
     plugins: [
         //will automatically inject bundle js into ./dist/index.html
         new HTMLWebpackPlugin({
             template: './dist/index.html', //source
             filename: 'index.html'  //destination
         })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000
      }
  }
