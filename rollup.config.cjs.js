import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.mjs',

  output: {
    format: 'cjs',
    exports: 'named',
    file: 'dist/castString.js'
  },

  plugins: [
    babel()
  ]
}
