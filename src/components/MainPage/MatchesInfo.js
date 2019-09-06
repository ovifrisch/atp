import React from 'react';
import './styles/MatchesInfo.css'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import {round_mapper} from './chart_helpers/chart_constants'

class MatchesInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			touney_name: null,
			tourney_date: null,
			tourney_matches: []
		}
	}

	setData(name, date, matches, color, x_pos, y_pos) {
		this.setState({
			tourney_name: name,
			tourney_date: date, 
			tourney_matches: matches
		})
		document.getElementById("the_matches_paper").setAttribute("style", `display:block; left:${x_pos}px; top:${y_pos}px; border: 5px solid ${color}`)
	}

	mouseLeave() {
		document.getElementById("the_matches_paper").setAttribute("style", "display:none;")
	}

	parseScore(score) {
		var sets = score.split(" ")
		var winner_sets = []
		var loser_sets = []
		for (var set of sets) {
			set = set.replace(/\(.*\)/, "") // remove the tiebreak parenthesis
			var x = set.split("-")
			winner_sets.push(x[0])
			loser_sets.push(x[1])
		}
		return [winner_sets, loser_sets]
	}

	parseDuration(dur) {

		if (dur == null) {
			return dur
		}

		const get_time = (dur, letter) => {
			var end_idx = dur.indexOf(letter)
			if (end_idx == -1) {
				return null;
			}
			var start_idx = end_idx - 1
			while (dur[start_idx] >= '0' && dur[start_idx] <= '9') {
				start_idx -= 1
			}
			start_idx += 1
			return dur.substring(start_idx, end_idx)
		}
		// PT18M18S
		var hours = get_time(dur, "H")
		var minutes = get_time(dur, "M")
		var seconds = get_time(dur, "S")
		var res = ""
		if (hours != null) {
			res += hours + ":"
		}
		if (minutes != null) {
			res += minutes + ":"
		}
		if (seconds != null) {
			if (seconds.length == 1) {
				res += "0"
			}
			res += seconds
		}
		return res
	}

	render() {

		const match_boxes = this.state.tourney_matches.map(match => {
			
			var parsed_scores = this.parseScore(match['score'])

			var video = null;
			if (match['video_url'] !== null) {
				var url = "http://" + match['video_url']
				video = (
					<a href={url} target="_blank">
						<img
							className="video_image"
							src={match['video_thumbnail']}
						/>
						<p>
							► {this.parseDuration(match['video_duration'])}
						</p>
					</a>
				)
			}

			return (
				<TableRow key={match['id']} className="the_match_row">
					<Grid container>
						<Grid item>
							{round_mapper[match['round']]}
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={6}>
							<Grid container>
								<Grid item xs={6}>
									<p className="winner_name">
										{match['winner']['first_name'][0] + ". " + match['winner']['last_name']}
									</p>
								</Grid>
								<Grid item>
									<Grid container spacing={1}>
										{
											parsed_scores[0].map(set_score => (
												<Grid item>
													<p className="winner_score">
														{set_score}
													</p>
												</Grid>
											))
										}
									</Grid>
								</Grid>
							</Grid>
							<Grid container>
								<Grid item xs={6}>
									<p className="loser_name">
										{match['loser']['first_name'][0] + ". " + match['loser']['last_name']}
									</p>
								</Grid>
								<Grid item>
									<Grid container spacing={1}>
										{
											parsed_scores[1].map(set_score => (
												<Grid item>
													<p className="loser_score">
														{set_score}
													</p>
												</Grid>
											))
										}
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							{video}
						</Grid>
					</Grid>
				</TableRow>
			)
		})

		return (
			<Paper id="the_matches_paper" onMouseLeave = {this.mouseLeave}>
				<Table>
					<TableBody>
						{match_boxes}
					</TableBody>
				</Table>
			</Paper>
		)
	}
}




export default MatchesInfo;