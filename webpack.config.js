const { babel } = require('./package.json');

module.exports = {
    mode: 'development',
    entry: './src/index.jsx',
    output: {
        filename: 'index.js',
        path: __dirname + '/assets/js/',
    },
    resolve: {
        extensions: ['jsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            cacheDirectory: true,
                            presets: babel.presets,
                            plugins: babel.plugins,
                        },
                    },
                ],
            },
        ],
    },
};
