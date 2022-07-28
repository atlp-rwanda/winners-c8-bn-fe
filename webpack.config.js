const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const webpack = require('webpack');
const { HotModuleReplacementPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
dotenv.config();
module.exports = {
	target: 'web',
	output: {
		path: path.join(__dirname, '/dist'), // the bundle output path
		filename: 'bundle.js',
		publicPath: '/',
		environment: {
			module: true,
		}, // the name of the bundle
	},
	mode: process.env.NODE_ENV || 'development',
	resolve: { extensions: ['*', '.js', '.jsx'] },
	plugins: [
		new HtmlWebpackPlugin({
			template: 'public/index.html', // to import index.html file inside index.js
		}),
		new webpack.ProvidePlugin({
			process: 'process/browser',
		}),
		new HotModuleReplacementPlugin(),
		new CleanWebpackPlugin(),
	],

	devServer: {
		port: process.env.PORT, // you can change the port
		historyApiFallback: true,
		headers: { 'Access-Control-Allow-Origin': '*' },
		open: true,
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/, // .js and .jsx files
				exclude: /node_modules/, // excluding the node_modules folder
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(sa|sc|c)ss$/, // styles files
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
				loader: 'url-loader',
				options: { limit: false },
			},
		],
	},
};
