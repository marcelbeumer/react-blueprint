function flush(modulePath) {
  const base = require.resolve(modulePath);
  Object.keys(require.cache).forEach(path => {
    if (path.indexOf(base) === 0) delete require.cache[path];
  });
}

module.exports = function (source) {
  this.cacheable();
  this.addDependency('./component');

  flush('./component');
  require('./component');

  const css = require('./component/styles').getCss();
  return [source, css].join('\n');
};
