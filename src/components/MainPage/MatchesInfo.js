import React from 'react';
import './styles/MatchesInfo.css'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import {round_mapper} from './chart_helpers/chart_constants'
import {RingLoader} from 'react-spinners';
import $ from "jquery";

const Video = (props) => {

	const parseDuration = (dur) => {

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

	return (
		<a href={props.url} target="_blank">
			<div className="video_container">
				<img
					className="video_image"
					src={props.thumbnail}
				/>
				<div className="video_duration">
					► {parseDuration(props.duration)}
				</div>
			</div>
		</a>
	)
}

const PlayerRow = (props) => {
	return (
		<Grid container>
			<Grid item xs={8}>
				<p className={props.nameClassName}>
					{props.name}
				</p>
			</Grid>
			<Grid item>
				<Grid container spacing={1}>
					{
						props.parsedScores.map(set_score => (
							<Grid item>
								<p className={props.scoreClassName}>
									{set_score}
								</p>
							</Grid>
						))
					}
				</Grid>
			</Grid>
		</Grid>
	)
}


const Match = (props) => {

	const parseScore = (score) => {
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

	var parsed_scores = parseScore(props.match['score'])

	var video = null;
	if (props.match['videoUrl'] !== null) {
		video = (
			<Video
				url={"http://" + props.match['videoUrl']}
				thumbnail={props.match['videoThumbnail']}
				duration={props.match['videoDuration']}
			/>
		)
	}

	return (
		<TableRow key={props.match['matchId']} className="the_match_row">
			<Grid container>
				<Grid item>
					{round_mapper[props.match['round_']]}
				</Grid>
			</Grid>
			<Grid container>
				<Grid item xs={9}>
					<PlayerRow
						nameClassName="winner_name"
						scoreClassName="winner_score"
						name={props.match['winner']['firstName'][0] + ". " + props.match['winner']['lastName']}
						parsedScores={parsed_scores[0]}
					/>
					<PlayerRow
						nameClassName="loser_name"
						scoreClassName="loser_score"
						name={props.match['loser']['firstName'][0] + ". " + props.match['loser']['lastName']}
						parsedScores={parsed_scores[1]}
					/>
				</Grid>
				<Grid item>
					{video}
				</Grid>
			</Grid>
		</TableRow>
	)
}

class MatchesInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tourney_name: null,
			tourney_date: null,
			tourney_matches: [],
			loading: true,
			color: 'red',
			displaying: false
		}
	}

	prepare_box(color, x_pos, y_pos) {
		$("#the_matches_paper").css("left", x_pos - 170)
		$("#the_matches_paper").css("top", y_pos - 100)
		$("#the_matches_paper").css("display", "block")
		$("#the_matches_paper").css("border", `5px solid ${color}`)
		$("#the_matches_paper").addClass("scale_transform")
		this.setState({
			color: color,
			displaying: true
		})
	}

	setData(name, date, matches) {
		this.setState({
			tourney_name: name,
			tourney_date: date, 
			tourney_matches: matches,
			loading: false
		})
	}

	componentDidUpdate() {
		$("#the_matches_paper").css("height", "auto")
	}

	mouseLeave() {
		$("#the_matches_paper").css("display", "none")
		this.setState({
			displaying: false
		})
	}

	render() {

		var content;

		const loader_style = `
			display: block;
			margin: 0 auto;
			top: 65px;
		`;

		if (this.state.loading) {
			content = (
				<RingLoader
					css={loader_style}
					color={this.state.color}
				/>
			)
		} else {

			var match_boxes = this.state.tourney_matches.map(match => (
				<Match
					match={match}
				/>
			))

			content = (
				<Table>
					<TableBody>
						<TableRow className="tourny_header">
							{this.state.tourney_name}
						</TableRow>
						{match_boxes}
					</TableBody>
				</Table>
			)
		}

		return (
			<Paper id="the_matches_paper" onMouseLeave = {() => this.mouseLeave()}>
				{content}
			</Paper>
		)
	}
}




export default MatchesInfo;