/* eslint-disable no-unused-vars */
import dotenv from 'dotenv';
import path from 'path'
dotenv.config({ path: path.join(__dirname, '../.env') });

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
// if (process.env.NODE_ENV !== 'production') {
//   dotenv.load({
//     path: path.join(__dirname, '../.env'),
//     sample: path.join(__dirname, '../.env.example')
//   })
// }

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '/api',
    masterKey: requireProcessEnv('MASTER_KEY'),
    mongo: {
      options: {
        db: {
          safe: true
        }
      }
    }
  },
  test: {
    mongo: {
      uri: 'mongodb://localhost/tanksystem-test',
      options: {
        debug: false
      }
    },
    seedDB: true,
    secureport: 443
  },
  development: {
    mongo: {
      uri: 'mongodb://localhost/tanksystem-dev',
      options: {
        debug: true
      }
    },
    seedDB: true,
    secureport: 443
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI,
      options: {
        debug: true
      }
    },
    seedDB: process.env.SEED === 'true',
    secureport: process.env.SECUREPORT || 443,
  }
}

module.exports = Object.assign(config.all, config[config.all.env])
export default module.exports
