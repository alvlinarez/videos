require('ignore-styles');
require('@babel/polyfill'); // Para async y await

require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react']
});

require('asset-require-hook')({
  extensions: ['jpg', 'png', 'gif'],
  name: '/dist/static/media/[name].[hash:8].[ext]'
});

require('./server');
