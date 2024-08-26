import path from 'path';
import { fileURLToPath } from 'url';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

// handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* in the context of Webpack, env is an object that contains environment 
variables passed to the configuration. */
export default (env) => {
  const plugins = [];
  /* The ..."--env analyze=true" part of the "analyze" script 
tells Webpack to pass an object { analyze: true } as the env parameter 
to the configuration function. */
  if (env && env.analyze) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]-bundle.js',
      clean: true, // Clean the output directory before emit.
      assetModuleFilename: "[name][ext]",
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
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: plugins,
  };
};
