import React from 'react';
import CurrentPlayers from "./CurrentPlayers"
import PlayerChart from "./PlayerChart"
import PlayerSelector from "./PlayerSelector"
import AgeSlider from "./DimensionSlider"
import PlayerChartSwitch from './PlayerChartSwitch'
import './styles/MainPage.css'

class MainPage extends React.Component {
	constructor(props) {
		super(props)
		this.graph = React.createRef()
		this.dimension_slider = React.createRef()
		this.current_players = React.createRef()
	}

	handle_slider_change(val, min_max) {
		this.graph.current.changeXDimension(
			this.graph.current.state.x_axis,
			min_max,
			val
		)
	}

	handle_added_player(id, name) {
		var player_color = this.graph.current.addPlayer(id, name)
		this.current_players.current.addPlayer(id, name, player_color)
	}

	handle_removed_player(id) {
		this.graph.current.removePlayer(id)
	}

	handle_dimension_change(dimension) {
		this.dimension_slider.current.change_dimension(dimension)
		this.graph.current.changeXDimension(
			dimension,
			null,
			null
		)
	}

	render() {
		return (
			<div id="the_age_comparison">
				<div id="player_selector_and_current_players">
					<PlayerSelector
						added_player_handler={(pl_id, pl_name) => this.handle_added_player(pl_id, pl_name)}
					/>
					<CurrentPlayers
						ref={this.current_players}
						removed_player_handler={(id) => this.handle_removed_player(id)}
					/>
					<PlayerChartSwitch
						dimension_change_handler = {(dim) => this.handle_dimension_change(dim)}
					/>
				</div>

				<div id="chart_and_slider">
					<PlayerChart
						ref={this.graph}
					/>
					<AgeSlider
						ref = {this.dimension_slider}
						slider_handler={(val, min_max) => this.handle_slider_change(val, min_max)}
					/>
				</div>
			</div>
		)
	}
}

export default MainPage;