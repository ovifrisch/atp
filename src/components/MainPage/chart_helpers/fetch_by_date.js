import create_dataset from './create_dataset'
import db from './api_calls'

function get_x_axis_data(start_age, end_age) {
	if (start_age >= end_age) {
		return []
	}
	var start = start_age + (1/96)
	var x_axis_data = []
	while (start <= end_age) {
		x_axis_data.push(start)
		start = start + (1/96)
	}
	return x_axis_data
}

function pad_data(ranks, dates, x_data) {
	var padded_ranks = Array(x_data.length).fill(null)
	var padded_dates = Array(x_data.length).fill(null)
	var date_idx = 0
	for (var i = 0; i < x_data.length; i++) {
		if (date_idx >= dates.length) {
			return [padded_ranks, padded_dates]
		} else if (dates[date_idx]['yr'] == x_data[i]['yr']
			&& dates[date_idx]['mo'] == x_data[i]['mo']
			&& dates[date_idx]['day'] == x_data[i]['day']) {
			padded_ranks[i] = ranks[date_idx]
			padded_dates[i] = dates[date_idx]
			date_idx += 1
		}
	}
	return [padded_ranks, padded_dates]
}

function getYByDate(me, start_date, end_date, y_axis, player_info, preserved_y_data) {
	var player_ids = player_info['player_ids']
	var player_names = player_info['player_names']
	var player_colors = player_info['player_colors']

	var new_y_data = []
	var new_x_data;

	const getAndSetData = async(idx) => {
		if (idx >= player_ids.length) {
			me.setState({
				y_data: preserved_y_data.concat(new_y_data),
				x_data: new_x_data,
				x_axis: 'date'
			})
			return
		} else if (idx == -1) {
			new_x_data = await db.get_dates(start_date, end_date)
		} else {
			var data;
			if (y_axis == 'rank') {
				data = await db.get_rankings_by_date(player_ids[idx], start_date, end_date)
				var ranks = data.map(x => x['rank'])
				var dates = data.map(x => x['date'])
				var padded_data = pad_data(
					ranks,
					dates,
					new_x_data
				)
				var padded_y_axis = padded_data[0]
				var padded_dates = padded_data[1]
				var new_y = create_dataset(
					padded_y_axis,
					padded_dates,
					player_names[idx],
					player_ids[idx],
					player_colors[idx]
				)
				new_y_data.push(new_y)
			}
		}
		getAndSetData(idx + 1)
	}

	getAndSetData(-1)
}


export default getYByDate;
