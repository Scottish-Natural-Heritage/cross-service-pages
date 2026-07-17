import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import * as sass from 'sass';
import packageImporter from 'node-sass-package-importer';
import config from './config.js';

// Read in the source file.
const lines = readFileSync('src/main.scss').toString().split('\n');

// Fill the place-holder line with a correct path.
for (const l in lines) {
  if (lines[l].trimStart().startsWith('$path-prefix:')) {
    lines[l] = `$path-prefix: '${config.pathPrefix}',`;
  }
}

const fixedFile = lines.join('\n');

// Render the SCSS.
const result = sass.renderSync({
  data: fixedFile,
  includePaths: ['node_modules'],
  importer: packageImporter(),
  outputStyle: 'compressed'
});

// Ensure directory is created before writing
mkdirSync('dist/assets', {recursive: true});
// Save it to the destination.
writeFileSync('dist/assets/main.css', result.css);
