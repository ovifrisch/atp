import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import {endpt_base} from '../../GlobalConstants'
// import { AutoSizer, Column, Table } from 'react-virtualized';
import './styles/EventsInfo.css'
import { css } from '@emotion/core';
import {RingLoader} from 'react-spinners';
import MatchesInfo from './MatchesInfo'
import db from './chart_helpers/api_calls'

class EventsInfo extends React.Component {
	constructor(props) {
		super(props)
		this.match_info = React.createRef()
		this.state = {
			loading: false,
			event_data: [],
			player_id: null,
			color: 'red',
			x_pos: 0,
			y_pos: 0
		}
	}

	set_event_data(data, player_id) {
		this.setState({
			event_data: data,
			loading: false,
			player_id: player_id
		})
	}

	prepare_box(color, x_pos, y_pos) {
		this.setState({
			loading: true,
			color: color,
			x_pos: x_pos,
			y_pos: y_pos

		})
		document.getElementById("the_tourney_paper").setAttribute("style", `display:block; left:${x_pos}px; top:${y_pos}px; border: 5px solid ${color}`)
	}

	handleHover(idx) {

		const set_matches = async() => {
			var event_id = this.state.event_data[idx]['event_id']
			var name = this.state.event_data[idx]['name']
			var date = this.state.event_data[idx]['date']
			var data = await db.get_matches(this.state.player_id, event_id, name)
			this.match_info.current.setData(
				name,
				date,
				data,
				this.state.color,
				this.state.x_pos,
				this.state.y_pos
			)
		}
		set_matches()
	}

	render() {
		const events = this.state.event_data.map((event, idx) => (
			<Avatar
				id="the_circle"
				src={endpt_base + "/" + event['image']}
				onMouseEnter = {() => this.handleHover(idx)}
				key={event['event_id']}
			/>
		))

		const override = css`
			display: block;
			margin: 0 auto;
			top: 120px;
		`;

		var content;
		if (this.state.loading == true) {
			content = (
				<RingLoader
					css={override}
					color={this.state.color}
				/>
			)
		} else {
			content = (
				<Grid
					container
					item
					xs={12}
					spacing={10}>
						{events}
				</Grid>
			)
		}

		return (
			<div>
				<Paper id= "the_tourney_paper">
					{content}
				</Paper>
				<MatchesInfo ref={this.match_info}/>
			</div>
		)
	}
}

/*
				
*/

export default EventsInfo;

