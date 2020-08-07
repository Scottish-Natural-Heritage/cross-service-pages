import assert from 'assert';

// Declare up front what env vars we need to continue and ensure they're set.
assert(process.env.CSP_PORT !== undefined, 'A port number (CSP_PORT) is required.');

const config = Object.freeze({
  port: process.env.CSP_PORT,
  hostPrefix: process.env.CSP_HOST_PREFIX
    ? `${process.env.CSP_HOST_PREFIX}`
    : `http://localhost:${process.env.CSP_PORT}`,
  pathPrefix: process.env.CSP_PATH_PREFIX ? `/${process.env.CSP_PATH_PREFIX}` : ''
});

export {config as default};
