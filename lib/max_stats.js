'use strict';
const _ = require('underscore-node');


let MostLocation = function (collection, cb) {
	collection.aggregate([{
		$group: {
			_id: '$location',
			count: {
				$sum: 1
			}
		}
	}], function (err, aggregate) {
		let result = _.max(aggregate, function (location) {
			return location.count
		});
		if (err) cb(err, null);
		return cb(null, result);
	});
};

let MostDefence = function (collection, cb) {
	collection.aggregate([{
		$group: {
			_id: '$defender_king',
			count: {
				$sum: 1
			}
		}
	}], function (err, aggregate) {
		let result = _.max(aggregate, function (king) {
			return king.count
		});
		if (err) cb(err, null);
		return cb(null, result);
	});
};

let MostAttacks = function (collection, cb) {
	collection.aggregate([{
		$group: {
			_id: '$attacker_king',
			count: {
				$sum: 1
			}
		}
	}], function (err, aggregate) {
		let result = _.max(aggregate, function (king) {
			return king.count
		});
		if (err) return cb(err, null);
		cb(null, result);
	});

};



let stats = function (collection, cb) {
	let finalResult = {};
	MostAttacks(collection, function (err, result) {
		if (err) throw err;
		finalResult.attacker_king = result;
		MostDefence(collection, function (err, result) {
			if (err) throw err;
			finalResult.defender_king = result;
			MostLocation(collection, function (err, result) {
				if (err) throw err;
				finalResult.location = result;
				cb(null, finalResult);
			});
		});
	});
};

module.exports = stats;
