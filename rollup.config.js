import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'
import filesize from 'rollup-plugin-filesize'
import progress from 'rollup-plugin-progress'
import visualizer from 'rollup-plugin-visualizer'
import json from 'rollup-plugin-json'
import replace from 'rollup-plugin-replace'
import livereload from 'rollup-plugin-livereload'
import reactSvg from 'rollup-plugin-react-svg'
import typescript from '@rollup/plugin-typescript';
import * as react from 'react';
import * as reactDom from 'react-dom';
// import * as reactIs from 'react-is';
// import * as propTypes from 'prop-types';

// Convert CJS modules to ES6, so they can be included in a bundle
import postcss from 'rollup-plugin-postcss'
import postcssModules from 'postcss-modules'
import postcssPresetEnv from 'postcss-preset-env'

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

const devOutput = [
	{
		dir: 'public/dist/module',
		format: 'es',
		sourcemap: !production,
	},
];

const prodOutput = [
	devOutput,
	{
		dir: 'public/dist/nomodule',
		format: 'system',
		sourcemap: !production,
	},
];

export default {
	input: ['src/index.tsx'],
	output: production ? prodOutput : devOutput,
	plugins: [
		typescript(),
		progress(),
		resolve({
			browser: true,
			extensions: ['.js', '.jsx', '.json'],
		}),
		json(),
		reactSvg(),
		commonjs({
			include: ['node_modules/**'],
			exclude: ['node_modules/process-es6/**'],
			namedExports: {
				'node_modules/react/index.js': [
					'Children',
					'Component',
					'PropTypes',
					'createElement',

				],
				'node_modules/react-dom/index.js': ['render'],
				react: Object.keys(react),
				'react-dom': Object.keys(reactDom),
				// 'react-is': Object.keys(reactIs),
				// 'prop-types': Object.keys(propTypes),
			},
		}),
		postcss({
			modules: true,
			plugins: [
				postcssModules({
					generateScopedName: '[local]',
				}),
				postcssPresetEnv({
					stage: 0,
				}),
			],
		}),
		babel({
			exclude: 'node_modules/**',
		}),
		filesize(),
		replace({
			'process.env.NODE_ENV': production
				? JSON.stringify('production')
				: JSON.stringify('development'),
		}),
		!production && visualizer(),
		!production && livereload(),
		production && uglify(),
	],
}
