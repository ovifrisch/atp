import React from 'react';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import './styles/PlayerChartSwitch.css'


class PlayerChartSwitch extends React.Component {
	constructor(props) {
		super(props)
	}

	handleChange(checked) {
		if (checked == false) {
			this.props.dimension_change_handler("date")
		} else {
			this.props.dimension_change_handler("age")
		}
	}

	render() {
		return (
			<div id="the_switch">
				<Typography component="div">
					<Grid component="label" container alignItems="center" spacing={1}>
						<Grid item>By Date</Grid>
						<Grid item>
							<Switch
								onChange = {(event, checked) => {this.handleChange(checked)}}
							/>
						</Grid>
						<Grid item>By Age</Grid>
					</Grid>
	      		</Typography>
	      	</div>
		)
	}
}


export default PlayerChartSwitch;