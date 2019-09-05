import {endpt_base} from '../../../GlobalConstants'

function date_to_str(date) {
	var mo;
	var day;
	var yr = date['yr']
	if (date['mo'] < 10) {
		mo = "0" + date['mo'].toString()
	} else{
		mo = date['mo'].toString()
	}
	if (date['day'] < 10){
		day = "0" + date['day'].toString()
	} else {
		day = date['day'].toString()
	}
	var res = yr + mo + day
	return res
}

function query_string(params) {
	return Object.keys(params).map((key) => key + "=" + params[key]).join("&")
}

function fullpath(path, query_string) {
	return endpt_base + path + "?" + query_string
}

function promise(path, params) {
	return fetch(fullpath(path, query_string(params))).then(
		response => response.json().then(
			data => {
				return data
			}
		)
	)
}

var db = {

	// get the ranking dates in asc order between these two dates
	get_dates: (min, max) => {
		var path = "/get_ranking_dates_between"
		var params = {
			starting_date: min,
			ending_date: max
		}
		return promise(path, params)
	},

	get_events: (player_id, starting_date, ending_date) => {
		starting_date = date_to_str(starting_date)
		ending_date = date_to_str(ending_date)

		var path = "/events"
		var params = {
			player_id: player_id,
			starting_date: starting_date,
			ending_date, ending_date
		}

		return promise(path, params)
	},

	get_matches: (player_id, event_id, tournament_name) => {
		var path = "/matches"
		var params = {
			player_id: player_id,
			event_id: event_id,
			tournament_name: tournament_name
		}
		return promise(path, params)
	},

	get_rankings_by_age: (p_id, start_age, end_age) => {
		var path = "/get_ranking_history"
		var params = {
			player_id: p_id,
			starting_age: start_age,
			ending_age: end_age
		}
		return promise(path, params)
	},

	get_rankings_by_date: (p_id, start_date, end_date) => {
		var path = "/get_ranking_history_date"
		var params = {
			player_id: p_id,
			starting_date: start_date,
			ending_date: end_date
		}
		return promise(path, params)
	}
}


export default db;