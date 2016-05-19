import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/router.js',
  format: 'umd',
  plugins: [ babel() ],
  dest: 'lib/router.js',
	moduleName: 'Router',
};
