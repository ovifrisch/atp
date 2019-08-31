

export function addPlayer(player_id, player_name) {
	if (this.state.datasets.map(x => x['player_id']).includes(player_id)) {
		return
	}

	var color = this.get_color()
	if (this.state.dimension == "age") {
		var promise = this.fetch_ranking_history(player_id, this.state.start_age, this.state.end_age)
		promise.then(response => response.json().then(data => {
			var ranks = data['data'].map(x => x['rank'])
			var dates = data['data'].map(x => x['date'])
			var labels = data['data'].map(x => x['age'])
			var values = this.pad_ranks_age(ranks, dates, labels, this.state.start_age, this.state.end_age)
			var padded_ranks = values[0]
			var padded_dates = values[1]
			var new_dataset = this.create_dataset(padded_ranks, padded_dates, player_name, player_id, color)
			this.setState({
				datasets: [...this.state.datasets, new_dataset],
				available_colors: this.state.available_colors.slice(1)
			})
		}))
	} else {
		var new_labels;
		var base = ""
		const request = async(idx) => {
			if (idx == -1) {
				let labels_enpt = `/get_ranking_dates_between?starting_date=${this.state.start_date}&ending_date=${this.state.end_date}`
				let labels_response = await fetch(base + labels_enpt)
				const labels_data = await labels_response.json();
				new_labels = labels_data['data']
				request(idx + 1)
			} else if (idx > 1) {
				return
			} else { // idx == 0
				var endpt = `/get_ranking_history_date?player_id=${player_id}&starting_date=${this.state.start_date}&ending_date=${this.state.end_date}`;
				const response = await fetch(base + endpt);
				const data = await response.json();
				var ranks = data['data'].map(x => x['rank'])
				var dates = data['data'].map(x => x['date'])
				var values = this.pad_ranks_date(new_labels, dates, ranks)
				var new_dataset = this.create_dataset(values[0], values[1], player_name, player_id, color)
				this.setState({
					datasets: [...this.state.datasets, new_dataset],
					available_colors: this.state.available_colors.slice(1)
				})
				request(idx + 1)
			}
		}

		if (this.state.datasets.length > 0) {
			new_labels = this.state.labels
			request(0)
		} else {
			request(-1)
		}
	}
	return color
}
