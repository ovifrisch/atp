import React, {useEffect, useState} from 'react';
import { Dropdown } from 'semantic-ui-react'
import './styles/PlayerSelector.css'
import {endpt_base} from '../../GlobalConstants'

class PlayerSelector extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			players: [],
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
			arr.push({text: d['last_name'].concat(", ", d['first_name']), value: d['id'], key: d['id']})
		}
		return arr
	}

	componentDidMount() {
		fetch(endpt_base + "/topTenPlayers").then(response => 
			response.json().then(data => {
				this.setState({
					players: this.convert_data(data['data']),
					init_load: true
				})
		}))
	}



	search_change(data) {
		this.setState({
			loading: true
		})
		const filter = data['searchQuery']
		if (filter.length == 0) {
			var base = "https://young-meadow-84276.herokuapp.com"
			fetch(base + "/topTenPlayers").then(response => 
			response.json().then(data => {
				console.log(data)
				this.setState({
					players: this.convert_data(data['data']),
					loading: false
				})
			}))
		}
		else {
			var base = "https://young-meadow-84276.herokuapp.com"
			fetch(base + `/topTenFiltered?prefix=${filter}`).then(response =>
			response.json().then(data => {
				console.log(data)
				this.setState({
					players: this.convert_data(data['data']),
					loading: false
				})
			}))
		}
	}

	label_click(data) {
		var player_name = null;
		var player_id = data['value']
		for (var i = 0; i < data['options'].length; i++) {
			if (data['options'][i]['value'] == player_id) {
				player_name = data['options'][i]['text']
			}
		}
		this.props.added_player_handler(player_id, player_name)
	}

	close(d) {
		console.log(d)
	}

	open(d) {
		if (this.state.init_load == false) {
			this.setState({
				loading: true
			})
		}
	}

	focus(d) {
		console.log('focus')
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
					onClose = {(e, d) => this.close(d)}
					onOpen = {(e, d) => this.open(d)}
					onFocus={(e, d) => this.focus(d)}
					text={'Search a player...'}
				/>
			</div>
		)
	}
}

export default PlayerSelector;