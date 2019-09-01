import {weeks_in_year} from './chart_constants'
import create_dataset from './create_dataset'
import db from './api_calls'

function pad_data(ranks, dates, ages, start_age, end_age, x_size) {
	var padded_ranks = Array(x_size).fill(null)
	var padded_dates = Array(x_size).fill(null)
	for (let i = 0; i < ages.length; i++) {
		if (ages[i] < start_age || ages[i] > end_age) {
			continue; // should never happen
		}
		var idx = Math.floor((ages[i] - start_age) / (1/(2*weeks_in_year)))
		padded_ranks[idx] = ranks[i]
		padded_dates[idx] = dates[i]
	}
	return [padded_ranks, padded_dates]
}

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

function getYByAge(me, start_age, end_age, y_axis, player_info, preserved_y_data) {
	var player_ids = player_info['player_ids']
	var player_names = player_info['player_names']
	var player_colors = player_info['player_colors']

	var new_y_data = []
	var new_x_data = get_x_axis_data(start_age, end_age)

	const getAndSetData = async(idx) => {
		// console.log(new_x_data)
		// console.log([...preserved_y_data, new_y_data])
		if (idx >= player_ids.length) {
			me.setState({
				y_data: preserved_y_data.concat(new_y_data),
				x_data: new_x_data,
				x_axis: 'age'
			})
		} else {
			var data;
			if (y_axis == 'rank') {
				data = await db.get_rankings_by_age(player_ids[idx], start_age, end_age)
			}
			var y_axis_data = data.map(x => x[y_axis])
			var dates = data.map(x => x['date'])
			var ages = data.map(x => x['age'])
			var padded_data = pad_data(
				y_axis_data,
				dates,
				ages,
				start_age,
				end_age,
				me.state.x_data.length
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
			getAndSetData(idx + 1)
		}
	}

	getAndSetData(0)
}


export default getYByAge;

