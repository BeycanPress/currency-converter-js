const path = require('path');

module.exports = {
    target: 'web',
    mode: 'production',
    entry: {
        index: './currency-converter.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'currency-converter.js',
        library: 'CurrencyConverter',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true,
    }
};