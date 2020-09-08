const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = function (_env, argv) {
  const isProduction = argv.mode === 'production';
  const isDevelopment = !isProduction;

  return {
    devtool: isDevelopment && 'cheap-module-source-map',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'assets/js/[name].[contenthash:8].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.(jsx|js)?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? 'production' : 'development'
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2
              }
            },
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          use: {
            loader: 'url-loader',
            options: {
              limit: false,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        },
        {
          test: /\.(svg)$/,
          use: ['@svgr/webpack', 'url-loader']
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          loader: require.resolve('file-loader'),
          options: {
            name: 'static/media/[name].[hash:8].[ext]'
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    plugins: [
      isProduction &&
        new MiniCssExtractPlugin({
          filename: 'assets/css/[name].[contenthash:8].chunk.css'
        }),
      isProduction && new ManifestPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          isProduction ? 'production' : 'development'
        )
      }),
    ].filter(Boolean),
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            compress: {
              comparisons: false
            },
            mangle: {
              safari10: true
            },
            output: {
              comments: false,
              ascii_only: true
            },
            warnings: false
          }
        }),
        new OptimizeCssAssetsPlugin()
      ],
      splitChunks: {
        chunks: 'all',
        // minSize: 0,
        // maxInitialRequests: 20,
        // maxAsyncRequests: 20,
        cacheGroups: {
          vendors: {
            name: 'vendors',
            reuseExistingChunk: true,
            priority: 1,
            enforce: true,
            test(module, chunks) {
              const name = module.nameForCondition && module.nameForCondition();
              return chunks.some(
                (chunk) =>
                  chunk.name !== 'vendors' &&
                  /[\\/]node_modules[\\/]/.test(name)
              );
            }
            // test: /[\\/]node_modules[\\/]/,
            // name(module, chunks, cacheGroupKey) {
            //   const packageName = module.context.match(
            //     /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            //   )[1];
            //   return `${cacheGroupKey}.${packageName.replace('@', '')}`;
            // }
          }
          // common: {
          //   minChunks: 2,
          //   priority: -10
          // }
        }
      }
    },
    devServer: {
      compress: true,
      historyApiFallback: true,
      open: true,
      overlay: true,
      port: 3000
    }
  };
};
