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
import $ from "jquery";


class EventsInfo extends React.Component {
	constructor(props) {
		super(props)
		this.match_info = React.createRef()
		this.state = {
			loading: false,
			event_data: [],
			player_id: null,
			color: 'red',
			hover_x: 0,
			hover_y: 0,
			data_is_set: false, // needed in componentDidUpdate
			canvas_height: 0,
			canvas_width: 0
		}
	}

	set_event_data(data, player_id) {
		$("#the_tourney_paper").css("width", "auto")
		$("#the_tourney_paper").css("height", "auto")
		this.setState({
			event_data: data,
			player_id: player_id,
			data_is_set: true,
			loading: false
		})
	}

	prepare_box(color, x_pos, y_pos, hover_x, hover_y, canvas_height, canvas_width) {
		$("#the_tourney_paper").css("display", "block")
		$("#the_tourney_paper").css("left", x_pos)
		$("#the_tourney_paper").css("top", y_pos)
		$("#the_tourney_paper").css("border", `5px solid ${color}`)
		$("#the_tourney_paper").css("width", 200)
		$("#the_tourney_paper").css("height", 200)
		this.setState({
			loading: true,
			color: color,
			hover_x: hover_x,
			hover_y: hover_y,
			data_is_set: false,
			canvas_height: canvas_height,
			canvas_width: canvas_width
		})
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
				this.state.hover_x,
				this.state.hover_y
			)
		}
		set_matches()
	}

	split_events(events, keep, empty_item) {
		var res = []
		for (var i = 0; i < events.length; i++) {
			if (i % 2 == keep) {
				res.push(events[i])
			} else {
				res.push(empty_item)
			}
		}
		return res
	}

	set_box_positions(box_height, box_width) {
		var x_pos = this.state.hover_x - (box_width / 2)
		var y_pos = this.state.hover_y - (box_height / 2)

		if (x_pos < 0) {
			x_pos = 0
		} else if (x_pos + box_width > this.state.canvas_width) {
			x_pos = this.state.canvas_width - box_width
		}

		if (y_pos < 0) {
			y_pos = 0
		} else if (y_pos + box_height > this.state.canvas_height) {
			y_pos = this.state.canvas_height - box_height
		}
		return [x_pos, y_pos]
	}

	componentDidUpdate() {
		if (this.state.data_is_set) {		
			var box_positions = this.set_box_positions(
				$("#the_tourney_paper").height(),
				$("#the_tourney_paper").width()
			)
			$("#the_tourney_paper").css("left", box_positions[0])
			$("#the_tourney_paper").css("top", box_positions[1])
			this.setState({
				data_is_set: false
			})
		}

	}

	render() {

		const empty_item = (
			<Grid item className="empty_item">
			</Grid>
		)

		const events = this.state.event_data.map((event, idx) => (
			<Grid item>
				<Avatar
					id="the_circle"
					src={endpt_base + "/" + event['image']}
					onMouseEnter = {() => this.handleHover(idx)}
					key={event['event_id']}
				/>
			</Grid>
		))

		const upper_events = this.split_events(events, 0, empty_item)
		const lower_events = this.split_events(events, 1, empty_item)

		const override = css`
			display: block;
			margin: 0 auto;
			top: 65px;
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
				<div>
					<Grid container wrap='nowrap'>
						{upper_events}
					</Grid>
					<Grid container wrap='nowrap'>
						{lower_events}
					</Grid>
				</div>
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

