export class HtmlWebpackAssetPlugin {
  event = 'html-webpack-plugin-before-html-processing';

  constructor(callback) {
    this.callback = callback;
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, compilerDone) => {
      compilation.plugin(this.event, (htmlPluginData, compilationDone) => {
        const hash = compilation.getStats().toJson().hash;
        this.callback(htmlPluginData.assets, hash);
        compilationDone();
      });
      compilerDone();
    });
  }
}
