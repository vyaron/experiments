
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
        filename: "assets/[name].bundle.js"
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
            }
        ]
    }
}