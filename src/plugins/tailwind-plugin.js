function tailwindPlugin(context, options) {
  return {
    name: "tailwind-plugin",
    configurePostCss(postcssOptions) {
      postcssOptions.plugins.push(require("tailwindcss"));
      postcssOptions.plugins.push(require("autoprefixer"));
      return postcssOptions;
    },
    configureWebpack(config, isServer, utils) {
      if (config.plugins) {
        // Strip out WebpackBar/ProgressPlugin to bypass Webpack validation errors 
        // with newer versions of dependency webpack
        config.plugins = config.plugins.filter(
          (p) => 
            p && 
            p.constructor && 
            p.constructor.name !== 'WebpackBarPlugin' && 
            p.constructor.name !== 'ProgressPlugin'
        );
      }
      return {};
    }
  };
}

module.exports = tailwindPlugin;
