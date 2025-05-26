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
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  // Настройки для оптимизации bundle'а
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
    // Минификация только для production
    minimize: !isDevelopment,
  },
  // Настройки для контроля размера bundle'а
  performance: {
    maxAssetSize: 500000, // 500 КБ
    maxEntrypointSize: 500000, // 500 КБ
    hints: isDevelopment ? false : 'warning', // Показывать предупреждения только в production
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
          // В режиме разработки используем style-loader для hot reload
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    // MiniCssExtractPlugin только для продакшена
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
    hot: true, // Hot Module Replacement
    liveReload: false, // Отключаем принудительную перезагрузку
    watchFiles: {
      paths: ['src/**/*.scss', 'src/**/*.css'], // Отслеживаем только стили
      options: {
        usePolling: false, // Отключаем polling для лучшей производительности
      },
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  // Настройки для отслеживания изменений
  watchOptions: {
    aggregateTimeout: 300,
    poll: false, // Отключаем polling
    ignored: /node_modules/,
  },
};