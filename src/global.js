// @flow
let enabled = false;
let property = null;

if (global.localStorage) {
  property = global.localStorage.expose;
  enabled = typeof property === 'string';
}

export function expose(name: string, thing: any) {
  if (!enabled) return;

  global[property] = global[property] || {};
  global[property][name] = thing;
}
