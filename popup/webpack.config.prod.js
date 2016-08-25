var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');

// Paths
var paths = {
	build: path.resolve('build'),
	src: path.resolve('popup/src'),
	eslintrc: path.resolve('.eslintrc'),
	nodeModules: path.resolve('node_modules'),
}

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: paths.src,
	output: {
		path: paths.build,
		filename: 'popup.js'
	},
	resolve: {
		extensions: ['', '.js']
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loader: 'eslint-loader',
				exclude: paths.nodeModules
			}
		],
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: [
						'babel-preset-es2015', 
						'babel-preset-es2016', 
						'babel-preset-react'
					],
					plugins: [
					    'babel-plugin-transform-class-properties',
					    'babel-plugin-transform-object-rest-spread',
					    'babel-plugin-transform-decorators-legacy'
					]
				},
				exclude: paths.nodeModules
			},
			{
				test: /\.css$/,
				include: paths.src,
				loader: 'style!css!postcss',
				exclude: paths.nodeModules
			}
		],
		eslint: {
			configFile: paths.eslintrc
		},
		postcss: function() {
			return [autoprefixer];
		}
	}

}