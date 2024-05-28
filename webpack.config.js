import path, { resolve } from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// Needed to handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',

  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle[contenthash].js',
    clean: true,
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
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, 'dist'), // serve contents of 'dist' folder
      },
      {
        directory: path.resolve(__dirname, 'public'), // serve contents of 'public' folder
      },
    ],
    port: 3333, // set the port to operate dev server from
    open: true, // upon 'npm run dev' command, open a browser window at the corresponding port
    hot: true, // use hot reloading
    compress: true, // enable GZIP compression
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$|\.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
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
  /* html-webpack-plugin is used to process the EJS template and generate an 
  index.html file in the dist directory. Generates an HTML5 file that includes 
  all webpack bundles in the body using script tags. */
  plugins: [
    new HtmlWebpackPlugin({
      template: './views/index.ejs',
      filename: 'index.html',
    }),
  ],
};
