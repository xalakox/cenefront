module.exports = {
  'extends': 'airbnb',
  'plugins': [
    'react',
    'babel',
  ],
  'rules': {
    'prefer-template': 2,
    'prefer-arrow-callback': 2,
    'no-unused-vars': [2, { 'argsIgnorePattern': '^_*$' }],
    'no-use-before-define': 0,
    'no-console': 0,
    'new-cap': 0,
  },
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 2017,
  },
};
