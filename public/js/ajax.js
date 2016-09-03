$(document).ready(function () {
	$("#list").click(function (event) {
		$.getJSON('/list', function (result) {
			$.each(result, function (key, value) {
				$('#result').append('<p>name:' + value.name + '</p>');
				$('#result').append('<p>location:' + value.location + '</p>');
				$('#result').append('<p>region:' + value.region + '</p>');
			});
		});
	});
	$("#count").click(function (event) {
		$('#result').load('/count');
	});
	$("#most-active").click(function (event) {
		$.getJSON('/stats/most_active', function (result) {
			$('#stats-result').append('<p>Attacker King:' + result.attacker_king._id + '</p>');
			$('#stats-result').append('<span>Count:' + result.attacker_king.count + '</span>');
			$('#stats-result').append('<p>Defender King:' + result.defender_king._id + '</p>');
			$('#stats-result').append('<span>Count:' + result.defender_king.count + '</span>');
			$('#stats-result').append('<p>Location:' + result.location._id + '</p>');
			$('#stats-result').append('<span>Count:' + result.location.count + '</span>');
		});
	});
	$("#defence-size").click(function (event) {
		$.getJSON('/stats/defence_size', function (result) {
			$.each(result.MaxMin, function (key, value) {
				$('#stats-result').append('<p>Maximum Defence Size:' + value.max + '</p>');
				$('#stats-result').append('<span>Minimum Defence Size:' + value.min + '</span>');
			});
			$.each(result.avg_size, function (key, value) {
				$('#stats-result').append('<p>Average Defence Size:' + value.defence_avg + '</p>');
			});
		});
	});
	$("#battle-types").click(function (event) {
		$.getJSON('/stats/battle_types', function (result) {
			$('#stats-result').append('<ul>Types Of Battles:' + '</ul>');
			$.each(result, function (key, value) {
				$('#stats-result').append('<li>' + value._id + '</li>');
			});
		});
	});
	$("#search").keyup(function (event) {
		$('#result').val("");
		var item = $("#search").val();
		var uri = "/search/?name=" + item;
		var send = encodeURI(uri).toString();
		$.getJSON(send, function (result) {
			$.each(result, function (key, value) {
				$('#result').append('<p>' + value.name + " " + value.year + " " + value.attacker_king + " " + value.defender_king + " " + value.location + '</p>');
			});
		});
	});
});
