let Wins = function (collection, cb) {
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
