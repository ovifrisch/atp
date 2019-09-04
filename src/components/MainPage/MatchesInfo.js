import React from 'react';
import './styles/MatchesInfo.css'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';

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
		/*
		7-6(2) 6-3
		6-4 2-6 6-3
		*/
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

	render() {

		const match_boxes = this.state.tourney_matches.map(match => {
			
			var parsed_scores = this.parseScore(match['score'])

			var video = null;
			if (match['video_url'] !== null) {
				var url = "http://" + match['video_url']
				video = (
					<a href={url} target="_blank">
						<img
							src={match['video_thumbnail']}
							height="50"
							width="100"
						/>
					</a>
				)
			}

			return (
				<TableRow key={match['id']} className="the_match_row">
					<Grid container>
						<Grid item>
							{match['round']}
						</Grid>
					</Grid>
					<Grid container>
						<Grid item>
							<Grid container>
								<Grid item>
									{match['winner']['first_name'] + " " + match['winner']['last_name']}
								</Grid>
								{
									parsed_scores[0].map(set_score => (
										<Grid item>
											{set_score}
										</Grid>
									))
								}
							</Grid>
							<Grid container>
								<Grid item>
									{match['loser']['first_name'] + " " + match['loser']['last_name']}
								</Grid>
								{
									parsed_scores[1].map(set_score => (
										<Grid item>
											{set_score}
										</Grid>
									))
								}
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