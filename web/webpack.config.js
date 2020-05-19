// Whilst the configuration object can be modified here, the recommended way of making
// changes is via the presets' options or Neutrino's API in `.neutrinorc.js` instead.
// Neutrino's inspect feature can be used to view/export the generated configuration.
const neutrino = require('neutrino');
const CopyPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const merge = require('webpack-merge');

module.exports = neutrino().webpack();


module.exports = merge(module.exports, {
    plugins: [
        new CopyPlugin([
            { from: 'res', to: '../public/res' },
        ]),
        new FaviconsWebpackPlugin('./src/icon.png')
    ],
});
