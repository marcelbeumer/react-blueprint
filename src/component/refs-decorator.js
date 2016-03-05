
export default function refs(cls) {
  const target = cls;
  const cache = {};

  function getHandler(name) {
    if (!cache[name]) {
      cache[name] = function (el) {
        this[name] = el;
      }.bind(this);
    }
    return cache[name];
  }

  Object.defineProperty(target.prototype, 'onRef', {
    configurable: true,
    get() {
      return getHandler.bind(this);
    },
  });

  return target;
}
