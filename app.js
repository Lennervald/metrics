// Npm modules
var express = require('express');
var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');
var compression = require('compression');

// Create a new express server, store in the variable app
var app = express();

// Make the express server abl.e to read the body of requests
app.use(bodyparser.json({ limit: '5mb' }));
app.use(bodyparser.urlencoded({ extended: false }));

// Make the express server able to handle
// cookies, sessions and logins
app.use(cookieparser());
app.use(compression());

// Point to a folder where we have static frontend files
app.use(express.static('www'));

app.post('/upload-file',(req, res)=>{
	var data = req.body.imgData;

	res.json('hello');
});

app.listen(3000, function() {
    console.log('Express app listening on port 3000');
});
