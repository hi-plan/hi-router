import babel from 'rollup-plugin-babel';

const banner = `
/**
 * Front End Router by Eric Wong
 * ele828@gmail.com
 * 2016/05/19
 *
 **/
`

export default {
  entry: 'src/router.js',
  format: 'umd',
  moduleName: 'Router',
  banner: banner,
  plugins: [ babel() ],
  dest: 'lib/router.js',
};
