import React from 'react';
import ChartComponent, {Chart, Line} from 'react-chartjs-2';
import MatchInfo from './MatchInfo'
import './styles/Graph.css'
import {default_colors} from './ChartConstants'
import {db} from './chart_api_calls.js'

class PlayerChart2 extends React.Component {
	constructor(props) {
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
			x_data: await this.db.get_dates(20, 30),
			y_data: [],
			available_colors: default_colors,
			highlight_data_idx: -1,
			highlight_idx1: 0,
			highlight_idx2: 0
		}
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
			datasets: 
		}

		return (
			<div id='the_chart2'>
				<ChartComponent
						type='myLine'
						ref="graph"
						data={data}
						options={options}
					/>
			</div>
		)
	}
}

PlayerChart2.prototype.db = db

export default PlayerChart2;