'use strict';
const express = require('express');
const http = require('http');
const path = require('path');
var exphbs  = require('express-handlebars');

const endpoints = require('./routes/endpoints');
const statEndpoints = require('./routes/stats');
const db = require('./db');
const mongoUrl = require('./config').mongoUrl;

const app = express();
const server = http.createServer(app);

db.connect(mongoUrl, function (err) {
	if (err) {
		console.log('unable to connect to the database');
	} else {
		console.log('connected to the database');
	}

});


app.engine('handlebars', exphbs());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', endpoints);
app.use('/stats', statEndpoints);



server.listen(3000, function (err) {
	if (err) throw err;
	console.log("server is on");
})
