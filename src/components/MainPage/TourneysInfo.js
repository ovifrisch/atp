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
// import { AutoSizer, Column, Table } from 'react-virtualized';
import './styles/TourneysInfo.css'
import { css } from '@emotion/core';
import {RingLoader} from 'react-spinners';
import MatchesInfo from './MatchesInfo'

class TourneysInfo extends React.Component {
	constructor(props) {
		super(props)
		this.match_info = React.createRef()
		this.state = {
			loading: false,
			match_data: [],
			color: 'red',
			x_pos: 0,
			y_pos: 0
		}
	}

	set_match_data(data) {
		this.setState({
			match_data: data,
			loading: false
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
		this.match_info.current.setData(
			this.state.match_data[idx]['name'],
			this.state.match_data[idx]['date'],
			this.state.match_data[idx]['matches'],
			this.state.color,
			this.state.x_pos,
			this.state.y_pos
		)
	}

	render() {
		const tournaments = this.state.match_data.map((tourney, idx) => (
			<Avatar
				id="the_circle"
				src="https://pbs.twimg.com/profile_images/877629573021679616/cJ8uOk-c_400x400.jpg"
				onMouseEnter = {() => this.handleHover(idx)}
				key={tourney.name + tourney.date}
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
						{tournaments}
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

export default TourneysInfo;

