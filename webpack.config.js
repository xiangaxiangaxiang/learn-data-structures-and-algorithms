const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [{ test: /\.ts$/, use: 'ts-loader' }],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'JS DATA STRUCTURES AND ALGORITHMS',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    optimization: {
        chunkIds: 'named',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
}
