const react = require('@neutrinojs/react');

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
  ],
};
