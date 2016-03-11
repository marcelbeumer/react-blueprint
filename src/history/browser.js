export default function createHistory() {
  let locationHandler = () => null;

  return {
    setLocationHandler(handler) {
      locationHandler = handler;
    },

    setLocation(title, location) {
      history.pushState(null, title, location);
      locationHandler(location);
    },

    initPopState() {
      global.addEventListener('popstate', () => {
        const { pathname } = location;
        locationHandler(pathname);
      });
    },
  };
}
