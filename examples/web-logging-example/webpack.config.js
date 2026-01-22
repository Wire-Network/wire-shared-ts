const path = require("path");
const webpack = require("webpack");

const FIREHOSE_CREDS_URL = process.env.FIREHOSE_CREDS_URL;
if (!FIREHOSE_CREDS_URL || !FIREHOSE_CREDS_URL.trim().length) {
  console.error("Error: FIREHOSE_CREDS_URL environment variable is required");
  process.exit(1);
}

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    static: { directory: path.join(__dirname, "public") },
    port: 9090,
    host: "0.0.0.0",
    hot: false
  },
  plugins: [
    new webpack.DefinePlugin({
      FIREHOSE_CREDS_URL: JSON.stringify(FIREHOSE_CREDS_URL)
    })
  ]
};
