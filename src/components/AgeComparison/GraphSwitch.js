import React from 'react';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


class GraphSwitch extends React.Component {
	constructor(props) {
		super(props)
	}

	handleChange(checked) {
		if (checked == false) {
			this.props.dimension_change_handler("age")
		} else {
			this.props.dimension_change_handler("date")
		}
	}

	render() {
		return (
			<Typography component="div">
				<Grid component="label" container alignItems="center" spacing={1}>
					<Grid item>By Age</Grid>
					<Grid item>
						<Switch
							onChange = {(event, checked) => {this.handleChange(checked)}}
						/>
					</Grid>
					<Grid item>By Date</Grid>
				</Grid>
      		</Typography>
		)
	}
}


export default GraphSwitch;