/* eslint-env node, mocha */
import assert from 'assert';
import { renderApp } from '../src/server';

describe('server module', () => {
  let html;

  beforeEach(() =>
    renderApp('/')
      .then(out => {
        html = out;
      }));

  it('renders the homepage as string', () => {
    assert(typeof(html) === 'string');
  });

  it('renders the homepage as html', () => {
    assert(/<html/.test(html));
  });
});
