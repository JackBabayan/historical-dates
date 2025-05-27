import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDevelopment = process.env.NODE_ENV !== 'production';

export default {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/main.tsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        gsap: {
          test: /[\\/]node_modules[\\/]gsap[\\/]/,
          name: 'gsap',
          chunks: 'all',
          priority: 10,
        },
      },
    },
    minimize: !isDevelopment,
  },
  performance: {
    maxAssetSize: 500000, // 500 КБ
    maxEntrypointSize: 500000, // 500 КБ
    hints: isDevelopment ? false : 'warning',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ],
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules\/swiper/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'sass-loader',
            options: {
              api: 'modern',
              sourceMap: isDevelopment
            }
          }
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules\/swiper/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/types': path.resolve(__dirname, 'src/types'),
      '@/styles': path.resolve(__dirname, 'src/styles'),
      '@/utils': path.resolve(__dirname, 'src/utils')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    ...(isDevelopment ? [] : [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      })
    ]),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    hot: true, 
    liveReload: false,
    watchFiles: {
      paths: ['src/**/*.scss', 'src/**/*.css'],
      options: {
        usePolling: false, 
      },
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: false,
    ignored: /node_modules/,
  },
};