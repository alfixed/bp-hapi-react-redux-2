import Boom from 'boom';
import { authJwtCookieConfig } from '../config/auth-jwt-cookie';
import axios from '../config/axios-instance-node';
import { serverConsoleError } from '../utils/server-console-error';

const AUTHORIZED_DIR = '/api/';
const UNAUTHORIZED_PATHS = [
  '/api/sign-in',
  '/api/sign-up'
];

function allowUnauthorized(path) {
  if (UNAUTHORIZED_PATHS.includes(path)) {
    return true;
  }
  return path.substr(0, AUTHORIZED_DIR.length) !== AUTHORIZED_DIR;
}

export function jwtAuthScheme(server, options) {
  const { method, url } = options;
  const authenticate = async (request, h) => {
    if (allowUnauthorized(request.path)) {
      return h.continue;
    }
    try {
      const authCookieValue = request.state[authJwtCookieConfig.tokenName];
      const { data: authResult } = await axios({ method, url, data: { token: authCookieValue } });
      console.log('authResult', authResult);
      if (authResult.payload) {
        const credentials = {
          uid: authResult.payload.uid,
          permissions: authResult.payload.permissions
        };
        return h.authenticated({ credentials });
      }
    } catch (e) {
      serverConsoleError('jwtAuthScheme ERROR:', e);
    }
    return Boom.unauthorized('Please Sign In');
  };
  // if authenticate return h.continue response is skipped
  const response = (request, h) => {
    console.log('request.auth', request.auth);
    return h.continue;
  };
  return {
    authenticate,
    response
  };
}
