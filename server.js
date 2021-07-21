const express = require('express');
const path = require('path');
const secure = require('express-force-https');

const port = process.env.PORT || 8080;

const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(secure);
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port);