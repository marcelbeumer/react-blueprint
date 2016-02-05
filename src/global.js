let enabled = false;
let property = null;

if (global.localStorage) {
  property = global.localStorage.expose;
  enabled = typeof property === 'string';
}

export function expose(name, thing) {
  if (!enabled) return;

  global[property] = global[property] || {};
  global[property][name] = thing;
}
