const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(
		'**',
		createProxyMiddleware({
			target: 'http://impraise-shorty.herokuapp.com',
			changeOrigin: true,
		})
	);
};
