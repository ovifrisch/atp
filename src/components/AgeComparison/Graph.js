import React from 'react';
import ChartComponent, {Chart, Line} from 'react-chartjs-2';
import MatchInfo from './MatchInfo'
import './styles/Graph.css'
import {addPlayer} from './graph_helpers'

class Graph extends React.Component {
	constructor(props) {
		super(props)
		this.info_box = React.createRef()
		this.state = {
			datasets: [],
			labels: this.get_labels_age(20, 30),
			start_age: 20,
			end_age: 30,
			start_date: '20100101',
			end_date: '20200101',
			available_colors: Graph.colors,
			highlight_data_idx: -1,
			highlight_idx1: 0,
			highlight_idx2: 0,
			match_data: [],
			dimension: 'age'
		}
	}

	pad_ranks_age(ranks, dates, labels, start, end) {
		var new_ranks = Array(Math.max(end - start, 0) * 96).fill(null)
		var new_dates = Array(Math.max(end - start, 0) * 96).fill(null)
		for (var i = 0; i < labels.length; i++) {
			if (labels[i] < start || labels[i] > end) {
				continue
			}
			var idx = Math.floor((labels[i] - start) / (1/96))
			new_dates[idx] = dates[i]
			if (new_ranks[idx] === null) {
				new_ranks[idx] = ranks[i]
			} else {
				new_ranks[idx] = Math.min(new_ranks[idx], ranks[i])
			}
		}
		return [new_ranks, new_dates]
	}

	getAgeRange(val, min_max) {
		// if any part of the interval of the new range is in the old range,
		// then we don't necessarily need to refetch this data. but for now
		// to keep things simple, just refetch everything
		var old_colors = this.state.datasets.map(x => x['data']['backgroundColor'])
		var player_ids = this.state.datasets.map(x => x['player_id'])
		var player_names = this.state.datasets.map(x => x['player_name'])
		var new_datasets = [];
		var start = this.state.start_age
		var end = this.state.end_age
		if (min_max == "max") {
			end = val
		} else if (min_max == "min") {
			start = val
		}
		var new_labels = this.get_labels_age(start, end)

		const request = async(idx) => {
			if (idx >= player_ids.length) {
				this.setState({
					datasets: new_datasets,
					labels: new_labels,
					start_age: start,
					end_age: end,
					dimension: 'age'
				})
				return
			}
			var base = "https://young-meadow-84276.herokuapp.com"
			var endpt = `/get_ranking_history?player_id=${player_ids[idx]}&starting_age=${start}&ending_age=${end}`
			const response = await fetch(base + endpt);
			const data = await response.json();
			var dates = data['data'].map(x => x['date'])
			var ranks = data['data'].map(x => x['rank'])
			var labels = data['data'].map(x => x['age'])
			var values = this.pad_ranks_age(ranks, dates, labels, start, end)
			var padded_ranks = values[0]
			var padded_dates = values[1]
			var new_dataset = this.create_dataset(padded_ranks, padded_dates, player_names[idx], player_ids[idx], old_colors[idx])
			new_datasets.push(new_dataset)
			request(idx + 1)
		}
		request(0)
	}

	get_labels_age(start_yr, end_yr) {
		if (start_yr >= end_yr) {
			return []
		}
		var start = start_yr + (1/96)
		var labels = []
		while (start <= end_yr) {
			labels.push(start)
			start = start + (1/96)
		}
		return labels
	}

	pad_ranks_date(labels, dates, ranks) {
		var new_ranks = Array(labels.length).fill(null)
		var new_dates = Array(labels.length).fill(null)
		var date_idx = 0
		for (var label_idx = 0; label_idx < labels.length; label_idx++) {
			if (date_idx >= dates.length) {
				return [new_ranks, new_dates]
			} else if (dates[date_idx]['yr'] == labels[label_idx]['yr']
				&& dates[date_idx]['mo'] == labels[label_idx]['mo']
				&& dates[date_idx]['day'] == labels[label_idx]['day']) {
				new_ranks[label_idx] = ranks[date_idx]
				new_dates[label_idx] = dates[date_idx]
				date_idx += 1
			}
		}
		return [new_ranks, new_dates]
	}

	addPlayer(player_id, player_name) {

		// first check to see if this player has already been added
		if (this.state.datasets.map(x => x['player_id']).includes(player_id)) {
			return
		}

		var color = this.get_color()
		if (this.state.dimension == "age") {
			var promise = this.fetch_ranking_history(player_id, this.state.start_age, this.state.end_age)
			promise.then(response => response.json().then(data => {
				var ranks = data['data'].map(x => x['rank'])
				var dates = data['data'].map(x => x['date'])
				var labels = data['data'].map(x => x['age'])
				var values = this.pad_ranks_age(ranks, dates, labels, this.state.start_age, this.state.end_age)
				var padded_ranks = values[0]
				var padded_dates = values[1]
				var new_dataset = this.create_dataset(padded_ranks, padded_dates, player_name, player_id, color)
				this.setState({
					datasets: [...this.state.datasets, new_dataset],
					available_colors: this.state.available_colors.slice(1)
				})
			}))
		} else {
			var new_labels;
			var base = "https://young-meadow-84276.herokuapp.com"
			const request = async(idx) => {
				if (idx == -1) {
					let labels_enpt = `/get_ranking_dates_between?starting_date=${this.state.start_date}&ending_date=${this.state.end_date}`
					let labels_response = await fetch(base + labels_enpt)
					const labels_data = await labels_response.json();
					new_labels = labels_data['data']
					request(idx + 1)
				} else if (idx > 1) {
					return
				} else { // idx == 0
					var endpt = `/get_ranking_history_date?player_id=${player_id}&starting_date=${this.state.start_date}&ending_date=${this.state.end_date}`;
					const response = await fetch(base + endpt);
					const data = await response.json();
					var ranks = data['data'].map(x => x['rank'])
					var dates = data['data'].map(x => x['date'])
					var values = this.pad_ranks_date(new_labels, dates, ranks)
					var new_dataset = this.create_dataset(values[0], values[1], player_name, player_id, color)
					this.setState({
						datasets: [...this.state.datasets, new_dataset],
						available_colors: this.state.available_colors.slice(1)
					})
					request(idx + 1)
				}
			}

			if (this.state.datasets.length > 0) {
				new_labels = this.state.labels
				request(0)
			} else {
				request(-1)
			}
		}
		return color
	}


	getDateRange(val, min_max) {

		var old_colors = this.state.datasets.map(x => x['data']['backgroundColor'])
		var player_ids = this.state.datasets.map(x => x['player_id'])
		var player_names = this.state.datasets.map(x => x['player_name'])

		var base = "https://young-meadow-84276.herokuapp.com"
		var new_datasets = []
		var new_labels;

		var start = this.state.start_date
		var end = this.state.end_date
		if (min_max == "max") {
			end = val.toString() + "0101"
		} else if (min_max == "min") {
			start = val.toString() + "0101"
		}

		const request = async(idx) => {
			if (idx >= this.state.datasets.length) {
				this.setState({
					datasets: new_datasets,
					labels: new_labels,
					start_date: start,
					end_date: end,
					dimension: 'date'
				})
				return
			}
			else if (idx == -1) {
				let labels_enpt = `/get_ranking_dates_between?starting_date=${start}&ending_date=${end}`
				let labels_response = await fetch(base + labels_enpt)
				const labels_data = await labels_response.json();
				new_labels = labels_data['data']
			} else {
				var player_id = this.state.datasets[idx]['player_id']
				var endpt = `/get_ranking_history_date?player_id=${player_id}&starting_date=${start}&ending_date=${end}`;
				const response = await fetch(base + endpt);
				const data = await response.json();
				var ranks = data['data'].map(x => x['rank'])
				var dates = data['data'].map(x => x['date'])
				var values = this.pad_ranks_date(new_labels, dates, ranks)
				var new_dataset = this.create_dataset(values[0], values[1], player_names[idx], player_ids[idx], old_colors[idx])
				new_datasets.push(new_dataset)
			}
			request(idx + 1)
		}

		request(-1)
	}

	change_dimension(dimension) {
		if (dimension == "age") {
			this.getAgeRange()
		} else {
			this.getDateRange()
		}
	}

	static colors = [
		'rgb(76, 128, 24, 1)',
		'rgb(24, 76, 128, 1)',
		'rgb(128, 24, 128, 1)',
		'rgb(216, 12, 12, 1)',
		'rgb(225, 122, 19, 1)',
		'rgb(19, 225, 225, 1)',
		'rgb(68, 97, 39, 1)',
		'rgb(97, 39, 39, 1)'
	]

	generate_color() {
		var o = Math.round, r = Math.random, s = 255;
		return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 1 + ')';
	}

	create_dataset(ranks, dates, player_name, player_id, color) {
		var res =
		{
			data: {
				my_id: player_id,
				label: player_name,
				spanGaps: true,
				fill: false,
				lineTension: 0.1,
				backgroundColor: color,
				borderColor: color,
				borderWidth: 3,
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: color,
				pointBackgroundColor: '#fff',
				pointBorderWidth: 4,
				pointHoverRadius: 7,
				pointHoverBackgroundColor: color,
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 1,
				pointRadius: 1,
				pointHitRadius: 1,
				data: ranks,
			},
			dates: dates,
			player_id: player_id,
			player_name: player_name
		}

		return res
	}

	// http GET to flask api to fetch ranking history of player with id=p_id between ages of s and e
	fetch_ranking_history(p_id, s, e) {
		var base = "https://young-meadow-84276.herokuapp.com"
		var endpt = `/get_ranking_history?player_id=${p_id}&starting_age=${s}&ending_age=${e}`
		return fetch(base + endpt)
	}


	fetch_ranking_history_date(p_id, s, e) {
		var base = "https://young-meadow-84276.herokuapp.com"
		var endpt = `/get_ranking_history_date?player_id=${p_id}&starting_date=${s}&ending_date=${e}`
		return fetch(base, endpt)
	}

	// http GET to flask api to fetch significant matches for this player at this age
	fetch_significant_matches(p_id, date1, date2) {

		const date_str = (date) => {
			var mo;
			var day;
			var yr = date['yr']
			if (date['mo'] < 10) {
				mo = "0" + date['mo'].toString()
			} else{
				mo = date['mo'].toString()
			}
			if (date['day'] < 10){
				day = "0" + date['day'].toString()
			} else {
				day = date['day'].toString()
			}
			var res = yr + mo + day
			return res
		}

		date1 = date_str(date1)
		date2 = date_str(date2)
		var base = "https://young-meadow-84276.herokuapp.com"
		var endpt = `/get_significant_matches?player_id=${p_id}&date1=${date1}&date2=${date2}`
		return fetch(base + endpt)
	}

	removePlayer(player_id) {
		var new_available_colors = this.state.available_colors;
		for (var i = 0; i < this.state.datasets.length; i++) {
			if (this.state.datasets[i]['player_id'] === player_id) {
				new_available_colors.unshift(this.state.datasets[i]['data']['backgroundColor'])
			}
		}

		this.setState({
			datasets: this.state.datasets.filter(x => x['player_id'] !== player_id),
			available_colors: new_available_colors
		})
	}

	get_color() {
		var color;
		if (this.state.available_colors.length == 0) {
			return this.generate_color()
		}
		return this.state.available_colors[0]
	}

	collinear(x1, y1, x2, y2, x3, y3) {
		return Math.abs(((y1 - y2) * (x1 - x3)) - ((y1 - y3) * (x1 - x2)))
	}
	// 
	// such that these x and y coordinates are collinear with those
	/*
	find (if any) the two consecutive data points in any of the datasets
	such that these x and y coordinates are collinear with those point
	AND x lies beteen p1.x and p2.x.
	if none, return null
	*/
	get_segment_intersection(chart, x, y) {
		var e1 = 1 // slack for x
		var e2 = 300 // slack for collineariy measure
		for (var i = 0; i < this.state.datasets.length; i++) {
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
				var collinearity = this.collinear(x, y, start_x, start_y, end_x, end_y)
				if (collinearity < e2) {
					return {'data_idx': nodes[j]['_datasetIndex'], 'i1':nodes[j]['_index'], 'i2':nodes[j+1]['_index']}
				}
			}
		}
		return null
	}

	highlight_segment(data_idx, i1, i2) {
		this.setState({
			highlight_data_idx: data_idx,
			highlight_idx1: i1,
			highlight_idx2: i2
		})
	}

	// called whenever the user hovers any part of the chart
	handle_hover(e, data) {
		var chart = this.refs['graph']['chartInstance']
		var x_pos = e['layerX']
		var y_pos = e['layerY']

		var indices = this.get_segment_intersection(chart, x_pos, y_pos)

		// not hovering a segment
		if (indices === null) {

			// was previously hovering a segment
			if (this.state.highlight_data_idx !== -1) {
				this.setState({
					highlight_data_idx: -1,
					highlight_idx1: 0,
					highlight_idx2: 0
				})
				document.getElementById("the_table").setAttribute("style", "display:none")
			}
			return

		// hovering a segment, was previously hovering it
		} else if (this.state.highlight_data_idx !== -1) {
			// same highlight segment
			if (indices['i1'] == this.state.highlight_idx1 && indices['i2'] == this.state.highlight_idx2) {
				return
			} else {
				document.getElementById("the_table").setAttribute("style", "display:none")
			}
		}

		// hovering a segment, just started hovering it
		this.highlight_segment(indices['data_idx'], indices['i1'], indices['i2'])
		this.fetch_and_process_match_data(indices['data_idx'], indices['i1'], indices['i2'], x_pos, y_pos)
	}

	rgb2hex(rgb){
		rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
		return (rgb && rgb.length === 4) ? "#" +
		("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
		("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
		("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
	}

	position_box(x, y) {
		// position the box based on the quadrant of the hover point
		// relative to the chart
		var canvas = this.refs['graph']['chartInstance']['canvas']
		var height = canvas['clientHeight']
		var width = canvas['clientWidth']
		//CHANGE DIMS HERE IF YOU CHANGE BOX WIDTH OR HEIGHT
		var box_height = 300
		var box_width = 500

		if (x > width / 2) {
			// bottom right
			if (y > height / 2) {
				return [x - box_width, y - box_height]
			
			// top right
			} else {
				return [x - box_width, y]
			}
		} else {
			// bottom left
			if (y > height / 2) {
				return [x, y - box_height]

			// top left
			} else {
				return [x, y]
			}
		}
	}

	display_match_data(data) {
		this.info_box.current.set_match_data(data['data'])
	}

	fetch_and_process_match_data(data_idx, i1, i2, x, y) {
		// first display the loading icon in the box
		var color = this.state.datasets[data_idx]['data']['borderColor']
		this.info_box.current.set_loading(color)
		var box_positions = this.position_box(x, y)
		document.getElementById("the_table").setAttribute("style", `display:block; left:${box_positions[0]}px; top:${box_positions[1]}px; border: 10px solid ${this.rgb2hex(color)}`)
		var player_id = this.state.datasets[data_idx]['player_id']
		var left_date = this.state.datasets[data_idx]['dates'][i1]
		var right_date = this.state.datasets[data_idx]['dates'][i2]
		var promise = this.fetch_significant_matches(player_id, left_date, right_date)
		promise.then(response => response.json().then(data => {
			this.display_match_data(data, x, y, color)
		}))
	}

	tick_callback(value) {
		if (this.state.dimension == "age") {
			return this.age_tick_callback(value)
		} else {
			return this.date_tick_callback(value)
		}
	}

	date_tick_callback(value) {
		var months = {1: 'Jan', 2: 'Feb', 3: 'Mar', 4:'Apr', 5:'May', 6: 'Jun', 7: 'Jul', 
					8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec'}
		return months[value['mo']] + " " + value['yr']
	}


	age_tick_callback(value) {
		var get_month = (val) => {
			val = val - Math.floor(val)
			return Math.ceil(12 * val)
		}
		var diff = this.state.end_age - this.state.start_age
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

	max_ticks() {
		var diff = this.state.end_age - this.state.start_age

		if (diff > 5) {
			return Math.floor(diff)
		} else {
			return 10
		}
	}

	render() {

		const datasets = this.state.datasets.map(x => x['data'])

		var max_ticks;
		var diff = this.state.end_age - this.state.start_age
		if (diff > 5) {
			max_ticks = Math.floor(diff)
		} else {
			max_ticks = 10
		}

		var g = this.refs['graph']

		const options = {

			scales: {
				yAxes: [{
					scaleLabel: {
						labelString: "Ranking",
						display: true
					}
				}],
				xAxes: [{
					scaleLabel: {
						labelString: "Age",
						display: true
					},
					ticks: {
						maxTicksLimit: this.max_ticks(),
						autoSkip: true,
						callback: (value, index, values) => this.tick_callback(value, index, values)
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

			onHover: (e, data) => this.handle_hover(e, data)
		}

		const data = {
			labels: this.state.labels,
			datasets: datasets
		};
		var the_obj = this

		Chart.controllers.myLine = Chart.controllers.line.extend({
			draw: function () {
				Chart.controllers.line.prototype.draw.apply(this, arguments)
				
				if (the_obj.state.highlight_data_idx == -1) {
					return
				}

				function setCharAt(str,index,chr) {
    				if(index > str.length-1) return str;
    					return str.substr(0,index) + chr + str.substr(index+1);
				}
				
				var meta = this['chart'].getDatasetMeta(the_obj.state.highlight_data_idx)
				var ctx = this.chart.ctx;
				var color = meta['dataset']['_model']['borderColor']
				ctx.strokeStyle = color.substr(0, color.length - 2) + "0.3)"
				ctx.lineWidth = 10;
				ctx.beginPath();
				var point1 = meta['data'][the_obj.state.highlight_idx1]
				ctx.moveTo(point1['_model']['x'], point1['_model']['y'])
				var point2 = meta['data'][the_obj.state.highlight_idx2]
				ctx.bezierCurveTo(
					point1['_model']['x'],
					point1['_model']['y'],
					point1['_model']['controlPointNextX'],
					point1['_model']['controlPointNextY'],
					point2['_model']['x'],
					point2['_model']['y']
				);
				ctx.stroke();
			}
		});

		return (
			<div>
				<div id="the_chart">
					<ChartComponent
						type='myLine'
						ref="graph"
						data={data}
						options={options}
					/>
				</div>
				<MatchInfo ref={this.info_box}/>
			</div>
		)
	}
}

export default Graph;