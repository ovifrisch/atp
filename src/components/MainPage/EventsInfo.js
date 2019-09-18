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
			canvas_width: 0,
			displaying: false
		}
	}

	/*
	Called from segment_hover.js after JSON response has been received

	
	*/
	set_event_data(events, player_id) {
		this.setState({
			event_data: events,
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
		$("#the_tourney_paper").addClass("scale_transform")
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

	initiate_match_display(idx, x, y) {
		this.match_info.current.prepare_box(
			this.state.color,
			x + $("#the_tourney_paper").position().left,
			y + $("#the_tourney_paper").position().top
		)
		const set_matches = async() => {
			var event_id = this.state.event_data[idx]['eventId']
			var name = this.state.event_data[idx]['tournamentName']
			var date = this.state.event_data[idx]['eventDate']
			var matches = await db.get_matches(this.state.player_id, event_id, name)
			this.match_info.current.setData(
				name,
				date,
				matches
			)
		}
		set_matches()
	}

	mouseEnter(idx, e) {
		if (this.match_info.current.state.displaying) {
			return
		}
		var x = e['nativeEvent']['layerX']
		var y = e['nativeEvent']['layerY']
		var el_id = `#the_circle_${this.state.event_data[idx]['eventId']}`
		$(el_id).addClass("blink_animate")
		var me = this
		$(el_id).one(
			"animationend",
			function(event) {
				me.initiate_match_display(idx, x, y)
			}
		)
	}

	mouseLeave(idx, e) {
		var el_id = `#the_circle_${this.state.event_data[idx]['eventId']}`
		$(el_id).removeClass("blink_animate")
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
			$("#the_tourney_paper").css("width", "auto")
			$("#the_tourney_paper").css("height", "auto")
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
					className="the_circle"
					src={endpt_base + "/" + event['tournamentImage']}
					onMouseEnter = {(e) => this.mouseEnter(idx, e)}
					onMouseLeave = {(e) => this.mouseLeave(idx, e)}
					key={event['eventId']}
					id={"the_circle_" + event['eventId']}
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

