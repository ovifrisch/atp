function create_dataset(ranks, dates, player_name, player_id, color) {
	var res =
	{
		data: {
			label: player_name,
			spanGaps: true,
			fill: false,
			lineTension: 0.1,
			backgroundColor: color,
			borderColor: color,
			borderWidth: 3,
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: color,
			pointBackgroundColor: '#fff',
			pointBorderWidth: 4,
			pointHoverRadius: 7,
			pointHoverBackgroundColor: color,
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			pointHoverBorderWidth: 1,
			pointRadius: 1,
			pointHitRadius: 1,
			data: ranks,
		},
		dates: dates,
		player_id: player_id
	}
	return res
}

export default create_dataset;