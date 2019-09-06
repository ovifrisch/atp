import db from './api_calls'

function collinear(x1, y1, x2, y2, x3, y3) {
	return Math.abs(((y1 - y2) * (x1 - x3)) - ((y1 - y3) * (x1 - x2)))
}

function display_event_data(me, data, player_id) {
	me.event_box.current.set_event_data(data, player_id)
}

function position_box(me, x, y, height, width) {
	// position the box based on the quadrant of the hover point
	// relative to the chart
	
	//CHANGE DIMS HERE IF YOU CHANGE BOX WIDTH OR HEIGHT
	var box_height = 300
	var box_width = 500
	var x_pos = x - 100
	var y_pos = y - 100
	// the x_pos can't be less than 0
	// the x_pos + 200 can't be greater than canvas width
	// the y_pos can't be less than 0
	// the y_pos + 200 can't be greater than the canvas height
	if (x_pos < 0) {
		x_pos = 0
	} else if (x_pos + 200 > width) {
		x_pos = width - 200
	}

	if (y_pos < 0) {
		y_pos = 0
	} else if (y_pos + 200 > height) {
		y_pos = height - 200
	}
	return [x_pos, y_pos]
}

function rgb2hex(rgb){
	rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	return (rgb && rgb.length === 4) ? "#" +
	("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
	("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
	("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function get_events(me, data_idx, i1, i2, x, y) {
	var color = me.state.y_data[data_idx]['data']['borderColor']
	var canvas = me.refs['graph']['chartInstance']['canvas']
	var height = canvas['clientHeight']
	var width = canvas['clientWidth']

	var init_box_position = position_box(me, x, y, height, width)
	me.event_box.current.prepare_box(rgb2hex(color), init_box_position[0], init_box_position[1], x, y, height, width)
	var player_id = me.state.y_data[data_idx]['player_id']
	var left_date = me.state.y_data[data_idx]['dates'][i1]
	var right_date = me.state.y_data[data_idx]['dates'][i2]

	const set_events = async() => {
		var data = await db.get_events(player_id, left_date, right_date)
		display_event_data(me, data, player_id)
	}
	set_events()
}

function highlight_segment(me, data_idx, i1, i2) {
	me.setState({
		highlight_data_idx: data_idx,
		highlight_idx1: i1,
		highlight_idx2: i2
	})
}

// 
	// such that these x and y coordinates are collinear with those
	/*
	find (if any) the two consecutive data points in any of the datasets
	such that these x and y coordinates are collinear with those point
	AND x lies beteen p1.x and p2.x.
	if none, return null
	*/
function get_segment_intersection(me, chart, x, y) {
	var e1 = 1 // slack for x
	var e2 = 300 // slack for collineariy measure
	for (var i = 0; i < me.state.y_data.length; i++) {
		var nodes = chart.getDatasetMeta(i)['data']
		nodes = nodes.filter(x => x['_model']['skip'] == false)
		for (var j = 0; j < nodes.length - 1; j++) {
			var start_x = nodes[j]['_model']['x']
			var start_y = nodes[j]['_model']['y']
			var end_x = nodes[j + 1]['_model']['x']
			var end_y = nodes[j + 1]['_model']['y']
			if (x < (start_x - e1) || x > (end_x + e1)) {
				continue
			}
			var collinearity = collinear(x, y, start_x, start_y, end_x, end_y)
			if (collinearity < e2) {
				return {'data_idx': nodes[j]['_datasetIndex'], 'i1':nodes[j]['_index'], 'i2':nodes[j+1]['_index']}
			}
		}
	}
	return null
}

// called whenever the user hovers any part of the chart
function handle_hover(me, e, data) {
	var chart = me.refs['graph']['chartInstance']
	var x_pos = e['layerX']
	var y_pos = e['layerY']

	var indices = get_segment_intersection(me, chart, x_pos, y_pos)

	// not hovering a segment
	if (indices === null) {

		// was previously hovering a segment
		if (me.state.highlight_data_idx !== -1) {
			me.setState({
				highlight_data_idx: -1,
				highlight_idx1: 0,
				highlight_idx2: 0
			})
			document.getElementById("the_tourney_paper").setAttribute("style", "display:none")
		}
		return

	// hovering a segment, was previously hovering it
	} else if (me.state.highlight_data_idx !== -1) {
		// same highlight segment
		if (indices['i1'] == me.state.highlight_idx1 && indices['i2'] == me.state.highlight_idx2) {
			return
		} else {
			document.getElementById("the_tourney_paper").setAttribute("style", "display:none")
		}
	}

	// hovering a segment, just started hovering it
	highlight_segment(me, indices['data_idx'], indices['i1'], indices['i2'])
	get_events(me, indices['data_idx'], indices['i1'], indices['i2'], x_pos, y_pos)
}


export default handle_hover;


