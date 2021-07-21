const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const cssNano = require('cssnano');
const autoPrefixer = require('autoprefixer');

const uglifyOptions = {
    warnings: false,
    output: {
        comments: false,
    },
};

module.exports = (env = {}) => {
    const { mode = 'development' } = env;

    const isProd = mode === 'production';
    const isDev = mode === 'development';

    const getStyleLoaders = () => [
        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    isDev ? () => { } : cssNano,
                    autoPrefixer(),
                ],
            },
        },
    ];

    const getPlugins = () => {
        const plugins = [
            new HtmlWebpackPlugin({
                template: 'public/index.html',
            }),
        ];

        if (isProd) {
            plugins.push(new MiniCssExtractPlugin({
                filename: 'main-[hash:8].css',
            }));
        }

        return plugins;
    };

    return {
        mode: isProd ? 'production' : isDev && 'development',

        output: {
            filename: isProd ? 'main-[hash:8].js' : undefined,
        },
        devtool: (isDev ? 'source-map' : false),
        resolve: {
            modules: [
                'node_modules',
            ],
            extensions: ['.js'],
        },
        optimization: {
            minimizer: (isDev ? [] : [
                new UglifyJsPlugin({
                    exclude: /node_modules/,
                    parallel: true,
                    sourceMap: true,
                    uglifyOptions,
                }),
            ]),
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.(css)$/,
                    use: getStyleLoaders(),
                },
                {
                    test: /\.(s[ca]ss)$/,
                    use: [...getStyleLoaders(), 'sass-loader'],
                },
                {
                    test: /\.(png|jpe?g|gif|ico)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'images',
                                name: '[name].[ext]',
                            },
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                disable: isDev,
                                mozjpeg: {
                                    progressive: true,
                                    quality: 95,
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(ttf|otf|eot|woff|woff2)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'fonts',
                                name: '[name].[ext]',
                            },
                        },
                    ],
                },
            ],
        },

        plugins: getPlugins(),

        devServer: {
            open: true,
            port: 3000,
            host: '0.0.0.0',
            public: 'localhost:3000',
            noInfo: true,
        },
    };
};
