import pkg from './package.json'
import url from '@rollup/plugin-url'

const plugins = [
  url({
    include: ['versions/*.md'],
    exclude: ['README.md'],
    limit: 30000,
  })
]

export default [
  // {
  //   input: 'index.js',
  //   output: {
  //     name: 'codeofdesign',
  //     file: pkg.browser,
  //     format: 'umd',
  //     exports: 'default',
  //   },
  //   plugins,
  // },
  {
    input: 'index.js',
    output: [
      // { file: pkg.main, format: 'cjs', exports: 'default' },
      { file: pkg.module, format: 'es', exports: 'default' },
    ],
    plugins,
  },
]