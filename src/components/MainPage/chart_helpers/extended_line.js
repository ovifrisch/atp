import {Chart} from 'react-chartjs-2';

function extend_line(me) {
	Chart.controllers.myLine = Chart.controllers.line.extend({
		draw: function () {
			Chart.controllers.line.prototype.draw.apply(this, arguments)
			
			if (me.state.highlight_data_idx == -1) {
				return
			}

			function setCharAt(str,index,chr) {
				if(index > str.length-1) return str;
					return str.substr(0,index) + chr + str.substr(index+1);
			}
			
			var meta = this['chart'].getDatasetMeta(me.state.highlight_data_idx)
			var ctx = this.chart.ctx;
			var color = meta['dataset']['_model']['borderColor']
			ctx.strokeStyle = color.substr(0, color.length - 2) + "0.3)"
			ctx.lineWidth = 10;
			ctx.beginPath();
			var point1 = meta['data'][me.state.highlight_idx1]
			ctx.moveTo(point1['_model']['x'], point1['_model']['y'])
			var point2 = meta['data'][me.state.highlight_idx2]
			ctx.bezierCurveTo(
				point1['_model']['x'],
				point1['_model']['y'],
				point1['_model']['controlPointNextX'],
				point1['_model']['controlPointNextY'],
				point2['_model']['x'],
				point2['_model']['y']
			);
			ctx.stroke();
		}
	});
	return Chart.controllers.myLine;
}

export default extend_line;
