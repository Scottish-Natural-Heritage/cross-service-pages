import {fileURLToPath} from 'node:url';
import path from 'node:path';
import express from 'express';
import morgan from 'morgan';
import nunjucks from 'nunjucks';

import config from './config.js';
import logger from './logger.js';

const app = express();

app.disable('x-powered-by');

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(morgan('combined', {stream: logger.stream}));

nunjucks.configure(['src/views', 'node_modules/naturescot-frontend', 'node_modules/govuk-frontend'], {
  autoescape: true,
  express: app
});

app.set('trust proxy', 1); // Trust first proxy

// `dist` is for our assets.
app.use(
  `${config.pathPrefix}/dist`,
  express.static(path.join(__dirname, '..', '/dist'), {immutable: true, maxAge: '30 minutes'})
);

// `govuk-frontend` is for their assets.
app.use(
  `${config.pathPrefix}/govuk-frontend`,
  express.static(path.join(__dirname, '..', '/node_modules/govuk-frontend/govuk'), {immutable: true, maxAge: '3 hours'})
);

// `health` is a simple health-check end-point to test whether the service is
// up.
app.get(`${config.pathPrefix}/health`, async (request, response) => {
  response.status(200).send({message: 'OK'});
});

// `/` currently renders the 404 page, but returns a 200 as it's 'technically'
// the correct page - it's just that we've not got any content here yet.
app.all(`${config.pathPrefix}`, (request, response) => {
  response.status(200).render('error-404.njk', {hostPrefix: config.hostPrefix, pathPrefix: config.pathPrefix});
});

// `error-404` is where nginx sends any 404 errors from anywhere on the server.
app.all(`${config.pathPrefix}/error-404`, (request, response) => {
  response.status(404).render('error-404.njk', {hostPrefix: config.hostPrefix, pathPrefix: config.pathPrefix});
});

// `error-413` is where nginx sends any 413 errors from anywhere on the server.
app.all(`${config.pathPrefix}/error-413`, (request, response) => {
  response.status(413).render('error-413.njk', {hostPrefix: config.hostPrefix, pathPrefix: config.pathPrefix});
});

// `error-500` is where nginx sends any 500 errors from anywhere on the server.
app.all(`${config.pathPrefix}/error-500`, (request, response) => {
  response.status(500).render('error-500.njk', {hostPrefix: config.hostPrefix, pathPrefix: config.pathPrefix});
});

// `privacy-policy` is where the privacy policy is kept.
app.all(`${config.pathPrefix}/privacy-policy`, (request, response) => {
  response.status(200).render('privacy-policy.njk', {hostPrefix: config.hostPrefix, pathPrefix: config.pathPrefix});
});

// If we hit this route then it's a true, app internal, 404 so render and
// return it as such.
app.use((request, response) => {
  response.status(404).render('error-404.njk', {hostPrefix: config.hostPrefix, pathPrefix: config.pathPrefix});
});

export {app as default};
