const ROOT_OBJECT = '__';

// evil module: instead, rewrite to do something similar to what the
// debug module does

export function expose(name, thing) {
  global[ROOT_OBJECT] = global[ROOT_OBJECT] || {};
  global[ROOT_OBJECT][name] = thing;
}
