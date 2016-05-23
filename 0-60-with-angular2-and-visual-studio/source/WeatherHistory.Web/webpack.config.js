
var autoprefixer = require("autoprefixer");

module.exports = {
    // Define the entry points for our application so webpack knows what to 
    //  use as inputs
    //
    entry: {
        app: ["./App/main"]
    },

    // Define where the resulting file should go
    //
    output: {
        filename: "content/[name].bundle.js"
    },

    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    // Turn on source maps for all applicable files.
    //
    devtool: "source-map",

    module: {
        loaders: [
            // Process any typescript or typescript-jsx files using the ts-loader
            //
            {
                test: /\.tsx?$/,
                loaders: ["ts-loader"]
            },

            // Process Sass files using the sass-loader first, and then with the 
            //  raw-loader so we can inject them into the 'styles' property of
            //  components (to take advantage of view encapsulation)
            //
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ['raw-loader', 'postcss-loader', 'sass-loader'] // sass-loader not scss-loader
            },

            // Load any HTML files into raw strings so they can be included with
            //  the angular components in-line
            //
            {
                test: /\.html$/,
                loaders: ['html-loader']
            }
        ]
    },
    postcss: function () {
        return [autoprefixer];
    }
}