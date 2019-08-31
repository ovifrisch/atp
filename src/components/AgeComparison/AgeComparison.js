import React from 'react';
import CurrentPlayers from "./CurrentPlayers"
import Graph from "./Graph"
import PlayerSelector from "./PlayerSelector"
import AgeSlider from "./DimensionSlider"
import GraphSwitch from './GraphSwitch'
import './styles/AgeComparison.css'

class AgeComparison extends React.Component {
	constructor(props) {
		super(props)
		this.graph = React.createRef()
		this.dimension_slider = React.createRef()
		this.current_players = React.createRef()
	}

	handle_slider_change_age(val, min_max) {
		this.graph.current.getAgeRange(val, min_max)
	}

	handle_slider_change_date(val, min_max) {
		this.graph.current.getDateRange(val, min_max)
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
		this.graph.current.change_dimension(dimension)
	}

	render() {
		return (
			<div id="the_age_comparison">
				<div id="player_selector_and_current_players">
					<PlayerSelector added_player_handler={(pl_id, pl_name) => this.handle_added_player(pl_id, pl_name)} />
					<CurrentPlayers ref={this.current_players} removed_player_handler={(id) => this.handle_removed_player(id)} />
					<GraphSwitch dimension_change_handler = {(dim) => this.handle_dimension_change(dim)}>
					</GraphSwitch>
				</div>

				<div id="chart_and_slider">
					<Graph ref={this.graph} />
					<AgeSlider
						ref = {this.dimension_slider}
						slider_handler_age={(val, min_max) => this.handle_slider_change_age(val, min_max)}
						slider_handler_date={(val, min_max) => this.handle_slider_change_date(val, min_max)}
					/>
				</div>
			</div>
		)
	}
}

export default AgeComparison;