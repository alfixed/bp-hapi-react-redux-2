const appId = 'ona-ao-ui';
const useMocks = process.env.APP_MOCKS === '1';
const appModeDev = process.env.APP_MODE_DEV === '1';
const serviceHost = process.env.SERVICE_HOST || '0.0.0.0';
const mongoDbHost = process.env.MONGODB_HOST || '0.0.0.0';
const mongoDbUser = process.env.MONGODB_USER;
const mongoDbPass = process.env.MONGODB_PASS;
const mongoDbName = process.env.MONGODB_NAME || 'testDb';
const env = process.env.NODE_ENV || 'localhost';
const { PROD_BUILD } = process.env;
console.log('useMocks', useMocks); // eslint-disable-line
console.log('serviceHost', serviceHost); // eslint-disable-line
console.log('mongoDbHost', mongoDbHost); // eslint-disable-line
console.log('mongoDbUser', mongoDbUser); // eslint-disable-line
console.log('mongoDbPass', mongoDbPass); // eslint-disable-line
console.log('mongoDbName', mongoDbName); // eslint-disable-line
console.log('env', env); // eslint-disable-line
console.log('PROD_BUILD', PROD_BUILD); // eslint-disable-line

export default function getConfig() {
  return {
    useMocks,
    appModeDev,
    env,
    appId,
    basePath: '',
    devtools: true,

    proxyAssets: {
      host: 'localhost',
      port: 9090
    },

    server: {
      serviceHost,
      mongoDbHost,
      mongoDbUser,
      mongoDbPass,
      mongoDbName,
      port: 8080,
      proxyClientIpHeader: 'wl-proxy-client-ip',
      customerIdHeader: 'customerid',
      requestTimeout: 60000
    },

    logger: {
      console: {
        level: 'info',
        prettyPrint: true
      },
      logstash: {
        level: 'info',
        prettyPrint: true,
        port: 5959,
        timeout_connect_retries: 15000,
        max_connect_retries: -1
      },
      skipEndpoints: [],
      maskFields: []
    },

    jwt: {
      secret: 'NeverShareYourSecret',
      expiresIn: 86400
    },

    services: {
      indexPage: {
        method: 'GET',
        path: ''
      },
      sendCode: {
        method: 'POST',
        path: '/api/send-code',
        url: `http://${serviceHost}/ona-pipe-api/getPhoneConfirm`
      },
      verifyCode: {
        method: 'POST',
        path: '/api/verify-code',
        url: `http://${serviceHost}/ona-pipe-api/checkPhoneConfirm`
      },
      validateJwt: {
        method: 'POST',
        path: '/api/validate-jwt'
      },
      courses: {
        method: 'GET',
        path: '/api/courses'
      },
      coursePost: {
        method: 'POST',
        path: '/api/courses'
      },
      course: {
        method: 'GET',
        path: '/api/courses/{courseId}'
      },
      coursePatch: {
        method: 'PATCH',
        path: '/api/courses/{courseId}/edit'
      },
      courseDelete: {
        method: 'DELETE',
        path: '/api/courses/{courseId}'
      }
    }
  };
}
