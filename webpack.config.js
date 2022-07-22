const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    mode: "production",
    entry: ["@babel/polyfill", path.resolve(__dirname, "src/index.tsx")],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].js"
    },
    stats: "only-error",
    target: "web",
    devtool: "source-map",
    devServer: {
        port: 3000,
        historyApiFallback: true,
        open: true
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js"]
    },
    performance: {
        hints: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
            filename: "index.html"
        }),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            "process.browser": true
        })
    ],
    module: {
        rules: [
            {
                test: /\.(tsx|ts)$/,
                exclude: /node_modules/,
                use: ["ts-loader"]
            },
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    }
}