module.exports = {
  // Helps resolve paths - https://github.com/storybookjs/storybook/issues/3291#issuecomment-609468718
  webpackFinal: (config) => {
    config.resolve.modules.push(process.cwd() + '/node_modules');
    config.resolve.modules.push(process.cwd() + '/src');

    // this is needed for working w/ linked folders
    config.resolve.symlinks = false;
    return config;
  },
  stories: ['../src/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: true, // type-check stories during Storybook build
  },
};
