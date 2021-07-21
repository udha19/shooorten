const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
	entry: ['./src/index.js'],
	output: {
		path: __dirname,
		publicPath: '/',
		filename: 'bundle.js',
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new Dotenv({
			path: path.resolve(__dirname, '..', './.env.development'),
		}),
	],
	devServer: {
		// proxy: {
		//   "/api": {
		//     target: "http://impraise-shorty.herokuapp.com",
		//     onProxyReq: (proxyReq) => {
		//       if (proxyReq.getHeader("http://localhost:8080")) {
		//         proxyReq.setHeader(
		//           "http://localhost:8080",
		//           "http://impraise-shorty.herokuapp.com"
		//         );
		//       }
		//     },
		//   },
		// },
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
		},
		proxy: {
			api: {
				target: 'https://impraise-shorty.herokuapp.com',
				secure: false,
				changeOrigin: true,
				headers: {
					Connection: 'keep-alive',
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{ test: /\.s[a|c]ss$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }] },
			{ test: /\.(png|gif|jpg|cur)$/i, loader: 'url-loader', options: { limit: 8192 } },
			{
				test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
				loader: 'url-loader',
				options: { limit: 10000, mimetype: 'application/font-woff2' },
			},
			{
				test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
				loader: 'url-loader',
				options: { limit: 10000, mimetype: 'application/font-woff' },
			},
			{ test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'file-loader' },
		],
	},
};
