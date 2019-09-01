import React from 'react';
import ChartComponent, {Chart, Line} from 'react-chartjs-2';
import MatchInfo from './MatchInfo'
import './styles/PlayerChart.css'
import {endpt_base} from '../../GlobalConstants'
import {default_colors} from './ChartConstants'
import db from './chart_api_calls.js'
import create_dataset from './chart_helpers/create_dataset'
import get_options from './chart_helpers/options'
import handle_hover from './chart_helpers/segment_hover'

class PlayerChart extends React.Component {
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
			available_colors: default_colors,
			highlight_data_idx: -1,
			highlight_idx1: 0,
			highlight_idx2: 0,
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
		var player_names = this.state.datasets.map(x => x['data']['label'])
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
			var endpt = `/get_ranking_history?player_id=${player_ids[idx]}&starting_age=${start}&ending_age=${end}`
			const response = await fetch(endpt_base + endpt);
			const data = await response.json();
			var dates = data.map(x => x['date'])
			var ranks = data.map(x => x['rank'])
			var labels = data.map(x => x['age'])
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
				var ranks = data.map(x => x['rank'])
				var dates = data.map(x => x['date'])
				var labels = data.map(x => x['age'])
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
			const request = async(idx) => {
				if (idx == -1) {
					let labels_enpt = `/get_ranking_dates_between?starting_date=${this.state.start_date}&ending_date=${this.state.end_date}`
					let labels_response = await fetch(endpt_base + labels_enpt)
					new_labels = await labels_response.json();
					request(idx + 1)
				} else if (idx > 1) {
					return
				} else { // idx == 0
					var endpt = `/get_ranking_history_date?player_id=${player_id}&starting_date=${this.state.start_date}&ending_date=${this.state.end_date}`;
					const response = await fetch(endpt_base + endpt);
					const data = await response.json();
					var ranks = data.map(x => x['rank'])
					var dates = data.map(x => x['date'])
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
		var player_names = this.state.datasets.map(x => x['data']['label'])

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
				new_labels = await this.db.get_dates(start, end)
				console.log(new_labels)
			} else {
				var player_id = this.state.datasets[idx]['player_id']
				var endpt = `/get_ranking_history_date?player_id=${player_id}&starting_date=${start}&ending_date=${end}`;
				const response = await fetch(endpt_base + endpt);
				const data = await response.json();
				var ranks = data.map(x => x['rank'])
				var dates = data.map(x => x['date'])
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

	generate_color() {
		var o = Math.round, r = Math.random, s = 255;
		return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 1 + ')';
	}

	// http GET to flask api to fetch ranking history of player with id=p_id between ages of s and e
	fetch_ranking_history(p_id, s, e) {
		var endpt = `/get_ranking_history?player_id=${p_id}&starting_age=${s}&ending_age=${e}`
		return fetch(endpt_base + endpt)
	}


	fetch_ranking_history_date(p_id, s, e) {
		var endpt = `/get_ranking_history_date?player_id=${p_id}&starting_date=${s}&ending_date=${e}`
		return fetch(endpt_base, endpt)
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
		var endpt = `/get_significant_matches?player_id=${p_id}&date1=${date1}&date2=${date2}`
		return fetch(endpt_base + endpt)
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

	

	render() {

		const datasets = this.state.datasets.map(x => x['data'])

		var max_ticks;
		var diff = this.state.end_age - this.state.start_age
		if (diff > 5) {
			max_ticks = Math.floor(diff)
		} else {
			max_ticks = 10
		}

		const data = {
			labels: this.state.labels,
			datasets: datasets
		};

		const options = get_options(this)

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

PlayerChart.prototype.db = db
PlayerChart.prototype.create_dataset = create_dataset
PlayerChart.prototype.get_options = get_options
PlayerChart.prototype.handle_hover = handle_hover

export default PlayerChart;