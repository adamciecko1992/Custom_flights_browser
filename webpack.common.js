// var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path"); //path jest modulem node.js wiec eni trezba go instalowac
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    // devtool: "none", //zwieksza czytelnosc kodu w main.js
    entry: {
        main: "./src/index.js",


    }, //stad bedzie brany kod zrodlowy
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9000,
    },
    module: {
        rules: [{
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: {
                        attrs: [":src"],
                    },
                },
            },

            {
                test: /\.(svg|png|jpg|gif|mp4|webm|jpeg)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        esModule: false,
                        name: "[name].[ext]",
                        outputPath: "img",
                    },
                },
            },
            {
                test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "../fonts/",
                        publicPath: "../static/fonts",
                    },
                }, ],
            },
        ],
    },
    plugins: [new CopyPlugin([{ from: "src/img", to: "img" },
        { from: "src/data", to: "data" }
    ])],
};