const path = require('path'),
      CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: "inline-source-map",

    entry: {
        content: './src/app/content.ts',
        background: './src/app/background.ts',
        popup: './src/pages/popup.tsx',
    },

    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name].js'
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    },

    plugins: [
        new CopyWebpackPlugin({
          patterns: [
              { from: 'src/pages/*.html'},
              { from: 'src/icons', to: './icons'},
          ]
        })
    ]
};
