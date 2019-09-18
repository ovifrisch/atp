import {endpt_base} from '../../../GlobalConstants'
// import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ApolloClient from 'apollo-boost'
import {convert1, convert2, convert3, convert_rank} from './date_conversions'

const client = new ApolloClient({
	uri: endpt_base + "/graphql"
})

function promise(query) {
	return client.query({
		query: gql(query)
	}).then(
		data => {
			console.log(data)
			data = data['data']
			for (var i = 2; i < arguments.length; i++) {
				data = data[arguments[i]]
			}
			if (arguments[1] !== null) {
				data = data.map(x => arguments[1](x))
			}
			return data
		}
	)
}

var db = {

	// get the ranking dates in asc order between these two dates
	get_dates: (min, max) => {
		var query = `
			{
				dates(minDate: "${convert1(min)}", maxDate: "${convert1(max)}")
			}
		`
		return promise(query, convert3, 'dates')
	},

	get_events: (player_id, min_date, max_date) => {
		min_date = convert2(min_date)
		max_date = convert2(max_date)

		var query = `
			{
				aPlayer(playerId: ${player_id}) {
					events(minDate: "${min_date}", maxDate: "${max_date}") {
						eventId
						tournamentName
						tournamentImage
						eventDate
					}
				}
			}
		`

		return promise(query, null, 'aPlayer', 'events')
	},

	get_matches: (player_id, event_id, tournament_name) => {

		var query = `
			{
				aPlayer(playerId: ${player_id}) {
					matches(eventId: ${event_id}) {
						matchId
						winner {
							firstName
							lastName
						}
						loser {
							firstName
							lastName
						}
						score
						round_
						videoUrl
						videoThumbnail
						videoDuration
					}
				}
			}
		`
		return promise(query, null, 'aPlayer', 'matches')
	},

	get_rankings_by_date: (p_id, min_date, max_date) => {
		min_date = convert1(min_date)
		max_date = convert1(max_date)
		var query = `
			{
				aPlayer(playerId: ${p_id}) {
					rankings(minDate: "${min_date}", maxDate: "${max_date}") {
						rank
						rankingDate
					}
				}
			}
		`
		return promise(query, convert_rank, 'aPlayer', 'rankings')
	},


	get_rankings_by_age: (p_id, min_age, max_age) => {
		var query = `
			{
				aPlayer(playerId: ${p_id}) {
					rankings(minAge: ${min_age}, maxAge: ${max_age}) {
						rank
						rankingDate
						playerAge
					}
				}
			}
		`
		return promise(query, convert_rank, 'aPlayer', 'rankings')
	},


	get_top_ten: () => {
		var query = `
			{
				players(limit: 10) {
					firstName
					lastName
					playerId
					image
				}
			}
		`
		return promise(query, null, 'players')
	},

	get_ten_filtered: (filter) => {
		var query = `
			{
				players(limit: 10, filterString: "${filter}") {
					firstName
					lastName
					playerId
					image
				}
			}
		`
		return promise(query, null, 'players')
	}
}


export default db;