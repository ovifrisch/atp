import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import { AutoSizer, Column, Table } from 'react-virtualized';
import './styles/MatchInfo.css'
import { css } from '@emotion/core';
import {MoonLoader} from 'react-spinners';


class MatchInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			match_data: []
		}
	}

	set_match_data(data) {
		this.setState({
			match_data: data,
			loading: false
		})
	}

	set_loading() {
		this.setState({
			loading: true
		})
	}

	render() {
		const rows = this.state.match_data.map(tourney => (
			tourney['matches'].map(match => (
				<TableRow key={match['id']}>
					<TableCell align="left">{tourney['name']}</TableCell>
					<TableCell align="left">{match['round']}</TableCell>
					<TableCell align="left">{match['winner']['first_name'] + " " + match['winner']['last_name']}</TableCell>
					<TableCell align="left">{match['loser']['first_name'] + " " + match['loser']['last_name']}</TableCell>
					<TableCell align="left">{match['score']}</TableCell>
				</TableRow>
			))
		))

		const override = css`
			display: block;
			margin: 0 auto;
			top: 100px;
		`;

		if (this.state.loading == true) {
			return (
				<div id="the_table">
					<Paper id= "the_paper">
						<MoonLoader
							css={override}
						/>
					</Paper>
				</div>	
			)
		} else {
			return (
				<div id="the_table">
					<Paper id= "the_paper">
						<Table size="small">
							<TableHead>
								<TableRow>
									<TableCell align="left">Tournament</TableCell>
									<TableCell align="left">Round</TableCell>
									<TableCell align="left">Winner</TableCell>
									<TableCell align="left">Loser</TableCell>
									<TableCell align="left">Score</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows}
							</TableBody>
						</Table>
					</Paper>
				</div>
			)
		}
	}
}


/*
				
*/

export default MatchInfo;

