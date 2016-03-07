/* eslint-env node, mocha */
import assert from 'assert';
import { renderHomepage } from '../src/server';

describe('server module', () => {
  const html = renderHomepage();

  it('renders the homepage as string', () => {
    assert(typeof(html) === 'string');
  });

  it('renders the homepage as html', () => {
    assert(/<html/.test(html));
  });
});
