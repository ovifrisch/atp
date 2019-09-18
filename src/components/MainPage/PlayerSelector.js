import React, {useEffect, useState} from 'react';
import { Dropdown } from 'semantic-ui-react'
import './styles/PlayerSelector.css'
import {endpt_base} from '../../GlobalConstants'
import db from './chart_helpers/api_calls'

class PlayerSelector extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			players: [],
			player_images: {},
			loading: false,
			placeholder: 'Select a Player',
			hovered_player: null,
			init_load: false
		}
	}

	convert_data(data) {
		const arr = []
		for (var i = 0; i < data.length; i++) {
			let d = data[i]
			arr.push({
				text: d['lastName'].concat(", ", d['firstName']),
				value: d['playerId'],
				key: d['playerId']
			})
		}
		return arr
	}
	

	set_images(data) {
		var hash = {}
		for (var d of data) {
			hash[d['playerId']] = d['image']
		}
		return hash
	}

	setTopTen(loading, init_load) {
		const getSetPlayers = async () => {
			var players = await db.get_top_ten()
			var images = this.set_images(players)
			this.setState({
				players: this.convert_data(players),
				images: images,
				init_load: init_load,
				loading:loading,
			})
		}
		getSetPlayers()
	}

	setTopTenFiltered(filter) {
		const getSetPlayers = async () => {
			var players = await db.get_ten_filtered(filter)
			var images = this.set_images(players)
			this.setState({
				players: this.convert_data(players),
				images: images,
				loading: false
			})
		}
		getSetPlayers()
	}

	componentDidMount() {
		this.setTopTen(false, true)
	}



	search_change(data) {
		this.setState({
			loading: true
		})
		const filter = data['searchQuery']
		if (filter.length == 0) {
			this.setTopTen(false, this.state.init_load)
		}
		else {
			this.setTopTenFiltered(filter)
		}
	}

	label_click(data) {
		var player_name = null;
		var player_id = data['value']
		var player_image = this.state.images[player_id]
		for (var i = 0; i < data['options'].length; i++) {
			if (data['options'][i]['value'] == player_id) {
				player_name = data['options'][i]['text']
			}
		}
		this.props.added_player_handler(player_id, player_name, player_image)
	}

	open(d) {
		if (this.state.init_load == false) {
			this.setState({
				loading: true
			})
		}
	}


	render() {
		return (
			<div id="the_player_selector">
				<Dropdown
					loading={this.state.loading}
					selectOnBlur={false}
					search
					selection
					onChange={(_, data) => this.label_click(data)}
					onSearchChange={(_, data) => this.search_change(data)}
					options={this.state.players}
					onOpen = {(e, d) => this.open(d)}
					text={'Search a player...'}
				/>
			</div>
		)
	}
}

export default PlayerSelector;