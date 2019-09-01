
function generate_color() {
	var o = Math.round, r = Math.random, s = 255;
	return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 1 + ')';
}

function get_color(me) {
	var color;
	if (me.state.available_colors.length == 0) {
		return generate_color()
	}
	return me.state.available_colors[0]
}

export default get_color;