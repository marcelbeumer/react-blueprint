export default function refHandler(target, name) {
  return function onRef(el) {
    target[name] = el; // eslint-disable-line no-param-reassign
  };
}
