export default function refHandler(target, name) {
  return function (el) {
    target[name] = el; // eslint-disable-line no-param-reassign
  };
}
