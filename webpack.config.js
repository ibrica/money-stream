const path = require('path'),
      webpack = require('webpack'),
      CopyWebpackPlugin = require('copy-webpack-plugin');

      

module.exports = {
    mode: "development",
    devtool: "inline-source-map",

    entry: {
        content: './src/app/content.ts',
        background: './src/app/background.ts',
        popup: './src/pages/popup.tsx'
    },

    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: '[name].js'
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        fallback: {
            "crypto": false, // Needed for solana wallet adapter
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer"),
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
              { from: 'src', to:'../', globOptions: { ignore: [ '**.ts', '**.tsx' ] }} 
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
          
    ]
};
