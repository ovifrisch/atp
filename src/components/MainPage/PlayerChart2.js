import React from 'react';
import ChartComponent, {Chart, Line} from 'react-chartjs-2';
import MatchInfo from './MatchInfo'
import './styles/PlayerChart2.css'
import {default_colors} from './ChartConstants'
import db from './chart_api_calls.js'
import create_dataset from './chart_helpers/create_dataset'
import get_options from './chart_helpers/options'
import handle_hover from './chart_helpers/segment_hover'

class PlayerChart2 extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			window: {
				left: {
					age: 20,
					date: '20100101'
				},
				right: {
					age: 30,
					date: '20200101'
				}
			},
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
			console.log(this.state.window.left.date)
			var x_axis =  await this.db.get_dates(
				this.state.window.left.date,
				this.state.window.right.date
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
	addPlayer(player_id) {

	}

	/*
	remove an existing player from the chart
	*/
	removePlyayer(player_id) {

	}


	/*
	change the range of the xdimension
	*/
	changeXDimension(dimension_id, min_max, new_val) {

	}

	/*
	change the y metric
	*/
	changeYDimension(dimension_id) {

	}

	/*
	inspect the matches for this player
	between the two x values
	*/
	inspectRange(player_id, x_idx1, x_idx2) {

	}


	render() {

		const data = {
			labels: this.state.x_data,
			datasets: this.state.y_data.map(x => x.data)
		}

		const options = get_options(this)

		return (
			<div id='the_chart2'>
				<ChartComponent
					ref="graph"
					data={data}
					options={options}
				/>
			</div>
		)
	}
}

PlayerChart2.prototype.db = db
PlayerChart2.prototype.get_options = get_options
PlayerChart2.prototype.create_dataset = create_dataset
PlayerChart2.prototype.handle_hover = handle_hover


export default PlayerChart2;