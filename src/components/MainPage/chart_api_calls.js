import {endpt_base} from '../../GlobalConstants'

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

var db = {

	// get the ranking dates in asc order between these two dates
	get_dates: (min, max) => {
		var path = "/get_ranking_dates_between"
		var params = {
			starting_date: min,
			ending_date: max
		}

		return fetch(fullpath(path, query_string(params))).then(
			response => response.json().then(
				data => {
					return data
				}
			)
		)
	},

	get_matches: (p_id, date1, date2) => {
		date1 = date_to_str(date1)
		date2 = date_to_str(date2)

		var path = "/get_significant_matches"
		var params = {
			player_id: p_id,
			date1: date1,
			date2: date2
		}

		var endpt = `/get_significant_matches?player_id=${p_id}&date1=${date1}&date2=${date2}`
		return fetch(fullpath(path, query_string(params))).then(
			response => response.json().then(
				data => {
					return data
				}
			)
		)
	}
}


export default db;