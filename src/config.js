import process from 'node:process';

// Grab our config from the env vars, or set some defaults if they're missing.
const config = Object.freeze({
  port: process.env.CSP_PORT || '3004',
  hostPrefix:
    process.env.CSP_HOST_PREFIX || process.env.CSP_PORT
      ? `http://localhost:${process.env.CSP_PORT}`
      : 'http://localhost:3004',
  pathPrefix: process.env.CSP_PATH_PREFIX ? `/${process.env.CSP_PATH_PREFIX}` : '/cross-service-pages'
});

export {config as default};
