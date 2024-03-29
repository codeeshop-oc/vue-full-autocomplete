const devPresets = ['@vue/babel-preset-app'];
const buildPresets = [
  [
    '@babel/preset-env',
    // Config for @babel/preset-env
    {
      // Example: Always transpile optional chaining/nullish coalescing
      // include: [
      //   /(optional-chaining|nullish-coalescing)/
      // ],
    },
  ],
  // ['@babel/preset-react', {targets: {node: 'current'}}],
  // ['@babel/plugin-syntax-jsx', {targets: {node: 'current'}}],
  // ['@babel/preset-plugin-syntax-jsx', {targets: {node: 'current'}}]
];
module.exports = {
  presets: (process.env.NODE_ENV === 'development' ? devPresets : buildPresets),
};
