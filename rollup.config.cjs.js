import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.js',

  output: {
    format: 'cjs',
    exports: 'named',
    file: 'dist/cast-string.cjs'
  },

  plugins: [
    babel({
      babelHelpers: 'bundled'
    })
  ]
};
