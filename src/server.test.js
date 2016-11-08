import {renderApp, staticApp} from '../src/server';

describe('browser rendering', () => {
  let html;

  beforeEach(() => staticApp('/').then(out => {
    html = out;
  }));

  it('returns a html string', () => {
    expect(html).toMatch(/<html/);
  });
});

describe('server rendering', () => {
  let html;

  beforeEach(() => renderApp('/').then(out => {
    html = out;
  }));

  it('renders a html string containing react elements', () => {
    expect(html).toMatch(/<html/);
    expect(html).toMatch(/data-react-checksum/);
    expect(html).toMatch(/data-reactid/);
  });
});
