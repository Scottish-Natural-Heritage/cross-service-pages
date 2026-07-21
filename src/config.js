import process from 'node:process';

const port = process.env.CSP_PORT || '3004';
// Grab our config from the env vars, or set some defaults if they're missing.
const config = Object.freeze({
  port,
  hostPrefix: process.env.CSP_HOST_PREFIX || `http://localhost:${port}`,
  pathPrefix: process.env.CSP_PATH_PREFIX ? `/${process.env.CSP_PATH_PREFIX}` : '/cross-service-pages'
});

export {config as default};
