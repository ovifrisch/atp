import React from 'react';
import ChartComponent, {Chart, Line} from 'react-chartjs-2';
import TourneysInfo from './TourneysInfo'
import './styles/PlayerChart.css'
import {default_colors} from './ChartConstants'
import db from './chart_helpers/api_calls.js'
import create_dataset from './chart_helpers/create_dataset'
import get_options from './chart_helpers/options'
import getYByAge from './chart_helpers/fetch_by_age'
import getYByDate from './chart_helpers/fetch_by_date'
import get_color from './chart_helpers/color_generator'
import extend_line from './chart_helpers/extended_line'

class PlayerChart extends React.Component {
	constructor(props) {
		super(props)
		this.info_box = React.createRef()
		this.state = {
			window_left_age: 20,
			window_left_date: '20100101',
			window_right_age: 30,
			window_right_date: '20200101',
			x_axis: 'date',
			y_axis: 'rank',
			x_data: [],
			y_data: [],
			available_colors: default_colors,
			highlight_data_idx: -1,
			highlight_idx1: 0,
			highlight_idx2: 0,
		}
	}

	componentDidMount() {
		const init_x_axis = async() => {
			var x_axis =  await db.get_dates(
				this.state.window_left_date,
				this.state.window_right_date
			)
			this.setState({
				x_data: x_axis
			})
		}
		init_x_axis()
	}



	/*
	add a player to the chart
	*/
	addPlayer(player_id, player_name) {
		if (this.state.y_data.map(x => x['player_id']).includes(player_id)) {
			return
		}
		var color = get_color(this)
		var player_info = {
			player_ids: [player_id],
			player_names: [player_name],
			player_colors: [color]
		}

		this.setState({
			available_colors: this.state.available_colors.slice(1)
		})

		if (this.state.x_axis == 'age') {
			getYByAge(
				this,
				this.state.window_left_age,
				this.state.window_right_age,
				this.state.y_axis,
				player_info,
				this.state.y_data
			)
		} else if (this.state.x_axis == 'date') {
			getYByDate(
				this,
				this.state.window_left_date,
				this.state.window_right_date,
				this.state.y_axis,
				player_info,
				this.state.y_data
			)
		}

		return color;
	}

	/*
	remove an existing player from the chart
	*/
	removePlayer(player_id) {
		var new_available_colors = this.state.available_colors;
		for (var i = 0; i < this.state.y_data.length; i++) {
			if (this.state.y_data[i]['player_id'] === player_id) {
				new_available_colors.unshift(this.state.y_data[i]['data']['borderColor'])
			}
		}

		this.setState({
			y_data: this.state.y_data.filter(x => x['player_id'] !== player_id),
			available_colors: new_available_colors
		})
	}

	/*
	change the range or metric of the xdimension
	*/
	changeXDimension(dimension, min_max, new_val) {
		var player_info = {
			player_ids: this.state.y_data.map(x => x['player_id']),
			player_names: this.state.y_data.map(x => x['data']['label']),
			player_colors: this.state.y_data.map(x => x['data']['borderColor'])
		}
		var left;
		var right;
		if (dimension == 'age') {
			left = this.state.window_left_age
			right = this.state.window_right_age
		} else if (dimension == 'date') {
			left = this.state.window_left_date
			right = this.state.window_right_date
		}
		if (min_max == 'min') {
			left = new_val
		} else if (min_max == 'max') {
			right = new_val
		}

		if (dimension == 'age') {

			this.setState({
				window_left_age: left,
				window_right_age: right
			})

			getYByAge(
				this,
				left,
				right,
				this.state.y_axis,
				player_info,
				[]
			)
		} else if (dimension == 'date') {

			this.setState({
				window_left_date: left,
				window_right_date: right
			})

			getYByDate(
				this,
				left,
				right,
				this.state.y_axis,
				player_info,
				[]
			)
		}
	}

	/*
	change the y metric
	*/
	changeYDimension(dimension) {
		return
	}


	render() {

		extend_line(this)
		const options = get_options(this)
		const data = {
			labels: this.state.x_data,
			datasets: this.state.y_data.map(x => x['data'])
		}

		return (
			<div>
				<div id='the_chart2'>
					<ChartComponent
						type='myLine'
						ref="graph"
						data={data}
						options={options}
					/>
				</div>
			<TourneysInfo ref={this.info_box}/>
			</div>
		)
	}
}


export default PlayerChart;