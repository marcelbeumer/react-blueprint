/* eslint-env node, mocha */
import assert from 'assert';
import { renderApp, staticApp } from '../src/server';

describe('server module', () => {
  describe('browser rendering', () => {
    let html;

    beforeEach(() => staticApp('/').then(out => {
      html = out;
    }));

    it('returns a html string', () => {
      assert(/<html/.test(html));
    });
  });

  describe('server rendering', () => {
    let html;

    beforeEach(() => renderApp('/').then(out => {
      html = out;
    }));

    it('renders a html string containing react elements', () => {
      assert(/<html/.test(html));
      assert(/data-react-checksum/.test(html));
      assert(/data-reactid/.test(html));
    });
  });
});
