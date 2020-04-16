const common = require("./webpack.common"); //zaimportowanie innego configa
const merge = require("webpack-merge"); //zaimportowanie merga
const path = require("path"); //path jest modulem node.js wiec eni trezba go instalowac
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = merge(common, {
    mode: "development",
    // devtool: "none", //zwieksza czytelnosc kodu w main.js
    output: {
        //tu bedzie wypluwany kod zrodlowy
        path: path.resolve(__dirname, "dist"), //tu komenda zeby odnalazl folder w "" i tam gruzowal kod
        filename: "[name].bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html"
        })
    ],
    module: {
        rules: [{
                test: /\.scss$/,
                use: [
                    "style-loader", //3. Inject styles into DOM
                    "css-loader", //2. Turns css into commonjs
                    "sass-loader" //1. Turns sass into css
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader", //3. Inject styles into DOM
                    "css-loader" //2. Turns css into commonjs
                ]
            }
        ]
    }
});