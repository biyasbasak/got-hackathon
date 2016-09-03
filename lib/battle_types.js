'use strict';
const _ = require('underscore-node');

let battleType = function (collection, cb) {
	collection.aggregate([{
		$group: {
			_id: '$battle_type'
		}
	}], function (err, aggregate) {
		aggregate = _.filter(aggregate, function (obj) {
			return obj._id
		});
		if (err) cb(err, null);
		return cb(null, aggregate);
	});
}


module.exports = battleType;
