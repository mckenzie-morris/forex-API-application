import path, { resolve } from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// Needed to handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',
  /* Can set multiple entry points like:
        
    entry: {
        bundle.js: [path.resolve(__dirname, 'src/main.js'), path.resolve(__dirname, 'other.js')]
    }

    // if multiple entry points, change:

    output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js' 
    }
    🚩🚩🚩NOTE: '[name]' is a variable that corresponds to the entry point key 🚩🚩🚩
    */
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle[contenthash].js',
  },

  resolve: {
    fallback: {
      url: false,
      path: false,
      util: false,
      stream: false,
      buffer: false,
      string_decoder: false,
      querystring: false,
      http: false,
      crypto: false,
      zlib: false,
      fs: false,
      net: false,
    },
  },

  module: {
    rules: [
      {
        test: /\.scss$|\.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'],
      // },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader',
        options: {
          esModule: true,
          variable: 'data', // Define a variable name for template data
        },
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
