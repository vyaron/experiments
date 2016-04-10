
module.exports = {
    entry: {
        app: ["./App/main"]
    },
    output: {
        filename: "assets/[name].bundle.js"
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    // Turn on source maps for all applicable files.
    //  Note, some file types (like sass/css) also require additional annotations
    //  on their loaders for this to work.
    //
    devtool: "source-map",

    module: {
        loaders: [
            // Process any typescript or typescript-jsx files using the ts-loader first,
            //  and then pass them through the ng-annotate loader to automatically annotate
            //  angular related function calls.
            //
            {
                test: /\.tsx?$/,
                loaders: ["ts-loader"]
            }
        ],

        noParse: [/zone\.js\/dist\/.+/, /angular2\/bundles\/.+/],

        // we need this due to problems with es6-shim
        node: { global: "window", progress: false, crypto: "empty", module: false, clearImmediate: false, setImmediate: false }
    }
}