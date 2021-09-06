const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = [
    {
        entry: './src/index.tsx',
        devServer: {
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                { test: /\.css$/, use: ['style-loader', 'css-loader'] },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                        },
                    ],
                },
                {
                    test: /\.(webm|png|jpg|mp4|mp3|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                    },
                },
            ],
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: './public/index.html',
                filename: './index.html',
            }),
            new CopyPlugin({
                patterns: [
                    { from: 'posts', to: 'posts' },
                    { from: 'posts', to: 'posts' },
                ],
            }),
        ],
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: 'app.js',
            path: path.resolve(__dirname, 'dist/public'),
            publicPath: '/',
        },
    },
];
