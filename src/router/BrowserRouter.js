import Router from './Router';

export * from './Router';

export default class BrowserRouter extends Router {

  constructor(routes: Object, initialUrl: string = location.pathname, onChange?: Function) {
    super(
      routes,
      initialUrl,
      (url) => {
        this._onChangePushState();
        if (onChange) onChange(url);
      });
  }

  _onPopState = this.setUrl(location.pathname);

  _onChangePushState = (url) => {
    if (location.pathname !== url) {
      history.pushState('', document.title, url);
    }
  };

  startListening() {
    global.addEventListener('popstate', this._onPopState);
  }

  stopListening() {
    global.removeEventListener('popstate', this._onPopState);
  }
}
