import type { Configuration } from 'webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import path from 'path'

export default {
  mode: 'production',
  entry: './index.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
  },
  plugins: [
    // @ts-expect-error
    new CleanWebpackPlugin({
      verbose: true,
    }),
  ],
  optimization: {
    minimize: false,
    usedExports: false,
  },
} as Configuration
