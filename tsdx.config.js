// Not transpiled with TypeScript or Babel, so use plain Es6/Node.js!
const url = require('@rollup/plugin-url');
const svgr = require('@svgr/rollup').default;

module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, options) {
    config.plugins = [url(), svgr(), ...config.plugins];
    return config;
  },
};
