const prod = process.env.NODE_ENV === "production";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: prod ? "production" : "development",
  entry: "./src/index.tsx",
  output: {
    path: __dirname + "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".ts", ".tsx", ".js", ".json"],
        },
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  devtool: prod ? undefined : "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        // { from: "./src/images", to: "./images" },
        // { from: "./src/models", to: "./models" },
        // { from: "./src/sounds", to: "./sounds" }
      ],
    }),
  ],
};
