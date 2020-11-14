import commonJs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import babelPlugin from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

import pkg from './package.json';

const { dependencies } = pkg;
const external = typeof dependencies === 'object' ? Object.keys(dependencies) : [];

export default {
  external,
  input: pkg.main.replace('dist', 'src'),
  output: {
    file: pkg.main,
    format: 'esm',
    sourcemap: false
  },
  plugins: [
    babelPlugin({
      babelrc: true,
      comments: false,
      exclude: /node_modules/
    }),
    commonJs({
      include: 'node_modules/**'
    }),
    uglify.uglify(),
    nodeResolve({
      mainFields: ['index']
    })
  ]
};
