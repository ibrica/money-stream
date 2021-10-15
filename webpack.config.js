const path = require('path'),
      webpack = require('webpack'),
      CopyWebpackPlugin = require('copy-webpack-plugin');

      

module.exports = {
    mode: "development",
    devtool: "inline-source-map",

    entry: {
        'extension/content' : './src/extension/app/content.ts', 
        'extension/inject': './src/extension/app/inject.ts',
        'extension/background': './src/extension/app/background.ts',
        'extension/popup' : './src/extension/app/pages/popup.tsx',
        'site/index' : './src/site/pages/index.tsx',
    },

    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name].js'
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        fallback: {
            "crypto": false, // Needed for solana wallet adapter
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer"),
            "path": false,
            "assert": false,
            "util": false,
            "fs": false,
        } 
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
              { from: 'src/extension/', to:'../dist/extension/', globOptions: { ignore: [ '**.ts', '**.tsx' ] }},
              { from: 'src/site/', to:'../dist/site/', globOptions: { ignore: [ '**.ts', '**.tsx' ] }},
          ]
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined            
            INLINE_RUNTIME_CHUNK:false, // To prevent Chrome CSP error, doesn't work see .env file
            DEBUG: false,
          }),
          // Work around for Buffer is undefined:
        // https://github.com/webpack/changelog-v5/issues/10
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),          
    ],
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist/site'),
        },
        compress: true,
        port: 9000,
      },
};
