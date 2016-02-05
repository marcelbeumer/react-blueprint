const ROOT_OBJECT = '__';

export function expose(name, thing) {
  global[ROOT_OBJECT] = global[ROOT_OBJECT] || {};
  global[ROOT_OBJECT][name] = thing;
}
