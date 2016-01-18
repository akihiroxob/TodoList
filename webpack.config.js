module.exports = {
    cache: true,
    entry: './assets/js/src/index.jsx',
    output: {
        filename: './assets/js/index.js',
    },
    resolve: {
        extenstions: ['jsx', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
}
