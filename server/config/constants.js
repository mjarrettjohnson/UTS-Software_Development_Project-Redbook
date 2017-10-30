import path from 'path';
import merge from 'lodash/merge';

const defaultConfig = {
  env: process.env.NODE_ENV,
  get envs() {
    return {
      test: process.env.NODE_ENV === 'test',
      development: process.env.NODE_ENV === 'development',
      production: process.env.NODE_ENV === 'production',
    };
  },

  version: require('../../package.json').version,
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 4567,
  ip: process.env.IP || '0.0.0.0',
  apiPrefix: '/api',
  userRoles: ['client', 'admin'],

  mongo: {
    seed: true,
    options: {
      db: {
        safe: true,
      },
    },
  },

  security: {
    sessionSecret: process.env.SESSION_SECRET || 'thisisasecretkey',
    sessionExpiration: process.env.SESSION_EXPIRATION || 60 * 60 * 24 * 1, // one day
    saltRounds: process.env.SALT_ROUNDS || 12,
  },
};

const environmentConfigs = {
  development: {
    mongo: {
      uri: process.env.MONGO_URI || 'mongodb://express:thisisapassword1@localhost/uts-journal-dev?ssl=true',
    },
    security: {
      saltRounds: 4,
    },
  },
  test: {
    port: 5678,
    mongo: {
      uri: 'mongodb://localhost/uts-journal-test',
    },
    security: {
      saltRounds: 4,
    },
  },
  production: {
    mongo: {
      seed: false,
      uri: process.env.MONGO_URI,
    },
  },
};

export default merge(defaultConfig, environmentConfigs[process.env.NODE_ENV] || {});
