const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');
// vue-loader 在新版里面做了改变，要在wepack 的配置plugins 里面加上VueLoaderPlugin

const isDev = process.env.NODE_ENV === "development"

const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    mode: 'production',
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
                // 不能处理.vue文件里<style>的部分，还要添加vue-style-loader来处理 npm i vue-style-loader
            },
            // 在开发环境这么用，放到下面了
            // {
            //     test: /\.styl/, // vue 文件里使用stylus写css时，文件名后面别加$
            //     use: ['style-loader', 'css-loader', 'stylus-loader']
            // },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: '[name]-[hash:8].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'procss.env': {
                NODE_ENV: isDev ? '"devolopment"' : '"production"'
            }
        }),
        new VueLoaderPlugin(),
        new HtmlPlugin()
    ]
}

if (isDev) {
    // 开发环境
    config.module.rules.push({
        test: /\.styl/, // vue 文件里使用stylus写css时，文件名后面别加$
        use: ['style-loader', 'css-loader', 'stylus-loader']
    })
    config.devtool = '#cheap-module-eval-source-map' 
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        open: true, // 运行npm run dev 自动打开浏览器
        hot: true  // 改组件代码，页面只重新渲染组件，不加载整个页面
    } 
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(), // hot: true 需要的插件
        new webpack.NoEmitOnErrorsPlugin()
    )
} else {
    // 正式环境 生产环境
    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue']
    }
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push({
        test: /\.styl/, // vue 文件里使用stylus写css时，文件名后面别加$
        use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'stylus-loader']
        })
    })
    config.plugins.push(
        new ExtractPlugin('styles.[hash:8].css'),
        // new webpack.optimize.commonsChunkPlugin({
        //     name: 'vendor'
        // })
    )
    //optimization与entry/plugins同级
    config.optimization = {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "vendor",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    }
}

module.exports = config