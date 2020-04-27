const react = require('@neutrinojs/react');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  options: {
    root: __dirname,
    output: '../public',
  },
  use: [
    react({
      html: {
        title: 'web'
      }
    }),
  ]
};