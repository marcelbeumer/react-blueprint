const HOST_PROPERTY = '_app';

class Debug {
  constructor(console) {
    this.console = console;
  }
  register(name, thing) {
    this[name] = thing;
  }
  log(...args) {
    if (this.console) {
      this.console.log(...args);
    }
  }
}

export default function createDebug(hostObject, console) {
  const debug = new Debug(console);
  if (hostObject && !hostObject[HOST_PROPERTY]) {
    hostObject[HOST_PROPERTY] = debug; // eslint-disable-line no-param-reassign
  }
  return debug;
}
