import {endpt_base} from '../../GlobalConstants'

export var db = {

	// get the ranking dates in asc order between these two dates
	get_dates: (min, max) => {
		var path = "/get_ranking_dates_between"
		var params = {
			starting_date: min,
			ending_date: max
		}
		var query_params = Object.keys(params).map((key) => key + "=" + params[key]).join("&")
		var full_path = path + "?" + query_params
		return fetch(full_path).then(response => response.json().then(data => {
			return data
		}))
	}
}