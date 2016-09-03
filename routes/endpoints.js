'use strict';
const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/')
	.get(function (req, res) {
		res.render('main', {
			body: "Home"
		});
	});

router.route('/searchPage')
	.get(function (req, res) {
		res.render('search');
	});

router.route('/search')
	.get(function (req, res) {
		let name = req.query.name;
		let collection = db.get().collection('battles');
		collection.find({
			$text: {
				$search: name
			}
		}).toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
	});

router.route('/list')
	.get(function (req, res) {
		let collection = db.get().collection('battles');
		collection.find({}, {
			"name": 1,
			"location": 1,
			"region": 1
		}).toArray(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
	});

router.route('/count')
	.get(function (req, res) {
		let collection = db.get().collection('battles');
		collection.count(function (err, result) {
			if (err) throw err;
			res.json(result);
		});
	});

router.route('/statsPage')
	.get(function (req, res) {
		res.render('stats');
	});

module.exports = router;
