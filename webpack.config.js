import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// Needed to handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',
    /* Can set multiple entry points like:
        
    entry: {
        bundle.js: [path.resolve(__dirname, 'src/index.js'), path.resolve(__dirname, 'main.js')]
    }

    // if multiple entry points, change:

    output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js' 
    }

    */
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle[contenthash].js',
  },
  resolve: {
    fallback: {
      "zlib": "browserify-zlib",
      "querystring": "querystring-es3",
      "path": "path-browserify",
      "crypto": "crypto-browserify",
      "fs": false,
      "net": false,
      "stream": "stream-browserify",
      "http": "stream-http",
      "async_hooks": false,
      "string_decoder": "string_decoder",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ejs$/,
        use: ['ejs-loader'],
      },
    ],
  },
   /* The html-webpack-plugin is used to process the EJS template and generate an 
  index.html file in the dist directory. */
  plugins: [
    new HtmlWebpackPlugin({
      template: './views/index.ejs',
      filename: 'index.html',  
    }),
  ],
};

