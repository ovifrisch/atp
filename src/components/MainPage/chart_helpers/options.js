import handle_hover from './segment_hover'

function age_tick_callback(value, start_age, end_age) {

	var get_month = (val) => {
		val = val - Math.floor(val)
		return Math.ceil(12 * val)
	}
	var diff = end_age - start_age
	if (diff > 5) {
		return Math.floor(value).toString()
	} else {
		var mo = get_month(value)
		if (mo == 0) {
			return Math.floor(value).toString()
		} else {
			return Math.floor(value).toString() + "." + mo.toString()
		}
	}
}

function tick_callback(value, dimension, start_age, end_age) {
	if (dimension == "age") {
		return age_tick_callback(value, start_age, end_age)
	} else {
		return date_tick_callback(value)
	}
}

function date_tick_callback(value) {
	var months = {1: 'Jan', 2: 'Feb', 3: 'Mar', 4:'Apr', 5:'May', 6: 'Jun', 7: 'Jul', 
				8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'}
	return months[value['mo']] + " " + value['yr']
}

function max_ticks(start_age, end_age) {
	var diff = end_age - start_age
	if (diff > 5) {
		return Math.floor(diff)
	} else {
		return 10
	}
}

function get_yLabel(me) {
	if (me.state.y_axis == 'rank') {
		return "Ranking"
	}
}

function get_xLabel(me) {
	if (me.state.x_axis == 'date') {
		return "Date"
	} else if (me.state.x_axis == 'age') {
		return "Age"
	}
}

function get_options(me) {
	console.log(me)
	var options = {
		scales: {
			yAxes: [{
				scaleLabel: {
					labelString: get_yLabel(me),
					display: true
				}
			}],
			xAxes: [{
				scaleLabel: {
					labelString: get_xLabel(me),
					display: true
				},
				ticks: {
					maxTicksLimit: max_ticks(me.state.window.left.age, me.state.window.right.age),
					autoSkip: true,
					callback: (value, index, values) => tick_callback(value, me.state.x_axis, me.state.window.left.age, me.state.window.right.age)
				}
			}]
		},

		tooltips: {
			enabled: false
		},

		legend: {
			onClick: (e) => e.stopPropagation(),
			display: false
		},

		onHover: (event, data) => handle_hover(me, event, data)
	}
	return options
}

export default get_options;