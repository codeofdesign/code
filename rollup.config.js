import pkg from './package.json'

export default [
  {
    input: 'index.js',
    output: {
      name: 'codeofdesign',
      file: pkg.browser,
      format: 'umd',
      exports: 'default',
    },
  },
  {
    input: 'index.js',
    output: [
      { file: pkg.main, format: 'cjs', exports: 'default' },
      { file: pkg.module, format: 'es', exports: 'default' },
    ],
  },
]