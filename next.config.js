const path = require('path');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');
const withAntdLess = require('next-plugin-antd-less');

const env = process.env.NODE_ENV || 'development';

const envConfigs = {
  development: {
    API_URL: 'https://api.imgbb.com',
    API_KEY: 'ca0226b9b94644bbadb59523a8f44524',
  },
  production: {
    API_URL: 'https://api.imgbb.com',
    API_KEY: 'ca0226b9b94644bbadb59523a8f44524',
  },
}[env];

module.exports = withPlugins(
  [
    [
      withAntdLess,
      {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    ],
    [withImages],
  ],
  {
    webpack: (config, { isServer }) => {
      if (isServer) {
        const antStyles = /antd\/.*?\/style.*?/;
        const origExternals = [...config.externals];
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback();
            if (typeof origExternals[0] === 'function') {
              origExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof origExternals[0] === 'function' ? [] : origExternals),
        ];
        config.module.rules.unshift({
          test: antStyles,
          use: 'null-loader',
        });
      }
      return config;
    },
    env: envConfigs,
    sassOptions: {
      includePaths: [path.join(__dirname, 'assets')],
    },
  }
);
