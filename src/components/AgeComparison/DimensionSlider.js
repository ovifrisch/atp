import React from 'react';
import { Slider } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import './styles/DimensionSlider.css'

class DimensionSlider extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dimension: 'age'
		}
	}

	change_age(val, min_max) {
		this.props.slider_handler_age(val, min_max)
	}

	change_date(val, min_max) {
		this.props.slider_handler_date(val, min_max)
	}

	change_dimension(dimension) {
		this.setState({
			dimension: dimension
		})
	}

	render() {

		function AirbnbThumbComponent(props) {
			return (
				<span {...props}>
					<span className="bar" />
					<span className="bar" />
					<span className="bar" />
				</span>
			);
		}

		const PrettoSlider = withStyles({
			root: {
				color: '#2522e0',
				height: 8,
			},
			thumb: {
				height: 24,
				width: 24,
				backgroundColor: '#fff',
				border: '2px solid currentColor',
				marginTop: -8,
				marginLeft: -12,
				'&:focus,&:hover,&$active': {
					boxShadow: 'inherit',
				},
			},
			active: {},
			valueLabel: {
				left: 'calc(-50% + 4px)',
			},
			track: {
				height: 8,
				borderRadius: 4,
			},
			rail: {
				height: 8,
				borderRadius: 4,
			},
		})(Slider);

		if (this.state.dimension == 'age') {
			return (
				<div id="the_dimension_slider">
					<PrettoSlider
						valueLabelDisplay="auto"
						aria-label="pretto slider"
						defaultValue={20}
						onChangeCommitted={(e, data) => this.change_age(data, "min")}
						min={10}
						max={50}
					/>
					<PrettoSlider
						valueLabelDisplay="auto"
						aria-label="pretto slider"
						defaultValue={30}
						onChangeCommitted={(e, data) => this.change_age(data, "max")}
						min={10}
						max={50}
					/>
				</div>
			)
		} else {
			return (
				<div id="the_dimension_slider">
					<PrettoSlider
						valueLabelDisplay="auto"
						aria-label="pretto slider"
						defaultValue={2010}
						onChangeCommitted={(e, data) => this.change_date(data, "min")}
						min={1972}
						max={2020}
					/>
					<PrettoSlider
						valueLabelDisplay="auto"
						aria-label="pretto slider"
						defaultValue={2020}
						onChangeCommitted={(e, data) => this.change_date(data, "max")}
						min={1972}
						max={2020}
					/>
				</div>
			)
		}
	}
}

export default DimensionSlider;