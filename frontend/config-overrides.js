const { override, addBabelPlugins } = require('customize-cra');

module.exports = override(
  ...addBabelPlugins(
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-nullish-coalescing-operator'
  )
);
