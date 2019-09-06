import React from 'react';
import { Button } from 'semantic-ui-react'
import './styles/CurrentPlayers.css'
import Avatar from '@material-ui/core/Avatar';
import {endpt_base} from '../../GlobalConstants'

class CurrentPlayers extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			players: []
		}
	}

	addPlayer(id, name, color, image) {
		if (this.state.players.map(x => x['id']).includes(id)) {
			return
		}
		this.setState({
			players: [...this.state.players, {id: id, name:name, color:color, image:image}]
		})
	}

	handle_button_click(data) {
		this.setState({
			players: this.state.players.filter(x => x['id'] !== data['id'])
		})
		this.props.removed_player_handler(data['id'])
	}

	render() {
		const players = this.state.players.map((player) => {
			return (
				<div id="the_current_player" key={player['id']}>
					<Button
						className="player_button"
						style={{backgroundColor: player['color'], borderRadius: 0}}
						id={player['id']}
						onClick={(e, data) => this.handle_button_click(data)}>{player['name']}
					</Button>
					<Avatar
						id="the_player_circle"
						src={endpt_base + "/" + player['image']}
					/>
					<br></br>
					<br></br>
				</div>
			)
		})

		return (
			<div id="the_current_players">
				{players}
			</div>
		)
	}
}

export default CurrentPlayers;