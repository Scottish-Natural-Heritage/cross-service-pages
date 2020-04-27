import {fileURLToPath} from 'url';
import path from 'path';
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

app.use(
  `${config.pathPrefix}/dist`,
  express.static(path.join(__dirname, '..', '/dist'), {immutable: true, maxAge: '30 minutes'})
);
app.use(
  `${config.pathPrefix}/govuk-frontend`,
  express.static(path.join(__dirname, '..', '/node_modules/govuk-frontend/govuk'), {immutable: true, maxAge: '3 hours'})
);

app.get(`${config.pathPrefix}/health`, async (request, response) => {
  response.status(200).send({message: 'OK'});
});

app.all(`${config.pathPrefix}/error-404`, (request, response) => {
  response.status(404).render('error-404.njk', {pathPrefix: config.pathPrefix});
});

app.all(`${config.pathPrefix}/error-500`, (request, response) => {
  response.status(500).render('error-500.njk', {pathPrefix: config.pathPrefix});
});

app.use((request, response) => {
  response.status(404).render('error-404.njk', {pathPrefix: config.pathPrefix});
});

export {app as default};
