'use strict';
const _ = require('underscore-node');

let maxMin = function (collection, cb) {
	collection.aggregate([{
		$group: {
			_id: null,
			max: {
				$max: '$defender_size'
			},
			min: {
				$min: '$defender_size'
			}
		}
	}], function (err, maxMin) {
		if (err) cb(err, null);
		return cb(null, maxMin);
	});
}


let Avg = function (collection, cb) {
	collection.aggregate([{
		$group: {
			_id: null,
			defence_avg: {
				$avg: '$defender_size'
			}
		}
	}], function (err, avg) {
		if (err) cb(err, null);
		return cb(null, avg);
	});
}



let defence_size = function (collection, cb) {
	let finalResult = {};
	Avg(collection, function (err, result) {
		if (err) cb(err);
		finalResult.avg_size = result;
		maxMin(collection, function (err, result) {
			if (err) cb(err);
			finalResult.MaxMin = result;
			cb(null, finalResult);
		});
	});
}

module.exports = defence_size;
