'use strict';
const express = require('express');
const router = express.Router();
const db = require('../db');
const _ = require('underscore-node');

let max_stats = require('../lib/max_stats');
let defender_size = require('../lib/defender_size_stats');
let battle_types = require('../lib/battle_types');


router.route('/most_active')
	.get(function (req, res) {
		let collection = db.get().collection('battles');
		max_stats(collection, function (err, result) {
			if (err) throw err;
			res.json(result);
		});
	});


router.route('/defence_size')
	.get(function (req, res) {
		let collection = db.get().collection('battles');
		defender_size(collection, function (err, result) {
			if (err) throw err;
			res.json(result);
		});
	});

router.route('/battle_types')
	.get(function (req, res) {
		let collection = db.get().collection('battles');
		battle_types(collection, function (err, result) {
			if (err) throw err;
			res.json(result);
		});
	});
module.exports = router;
