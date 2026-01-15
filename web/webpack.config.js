const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production';
    const devServerHost = process.env.WEBPACK_DEV_SERVER_HOST || '127.0.0.1';
    const devServerPort = Number(process.env.WEBPACK_DEV_SERVER_PORT) || 3000;

    return {
        entry: path.resolve(__dirname, 'src', 'index.jsx'),
        output: {
            path: path.resolve(__dirname, '../public'),
            filename: isProd ? 'bundle.[contenthash].js' : 'bundle.js',
            publicPath: '/',
            clean: true
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type: 'asset/resource'
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.GA_TRACKING_ID': JSON.stringify(process.env.GA_TRACKING_ID || '')
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'index.html')
            }),
            new CopyPlugin({
                patterns: [
                    { from: path.resolve(__dirname, 'res'), to: 'res' },
                    { from: path.resolve(__dirname, 'src', 'icon.png'), to: 'icon.png' },
                    { from: path.resolve(__dirname, 'src', 'favicon-16x16.png'), to: 'favicon-16x16.png' },
                    { from: path.resolve(__dirname, 'src', 'favicon-32x32.png'), to: 'favicon-32x32.png' },
                    { from: path.resolve(__dirname, 'src', 'apple-touch-icon.png'), to: 'apple-touch-icon.png' },
                    { from: path.resolve(__dirname, 'src', 'android-chrome-192x192.png'), to: 'android-chrome-192x192.png' },
                    { from: path.resolve(__dirname, 'src', 'android-chrome-512x512.png'), to: 'android-chrome-512x512.png' },
                    { from: path.resolve(__dirname, 'src', 'manifest.json'), to: 'manifest.json' }
                ]
            })
        ],
        devtool: isProd ? 'source-map' : 'eval-source-map',
        devServer: {
            static: {
                directory: path.resolve(__dirname, '../public')
            },
            historyApiFallback: true,
            open: true,
            hot: true,
            host: devServerHost,
            port: devServerPort
        }
    };
};
