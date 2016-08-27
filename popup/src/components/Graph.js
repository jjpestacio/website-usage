import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Chart from 'chart.js'

import './styles/graph.css'
import { TODAY } from '../constants'
import { displayTime, displayInterval, getTotalTime } from '../functions'

@connect(
	state => ({
		archives: state.archives,
		date: state.date,
		websites: state.websites
	})
)

export default class Graph extends Component {
	constructor(props) {
		super(props);
		this.state = {
			canvas: null,
			chart: null,
			totalTime: null
		}

		this.createGraph = this.createGraph.bind(this);
		this.createLabel = this.createLabel.bind(this);
		this.getData = this.getData.bind(this);
		this.selectDate = this.selectDate.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const { canvas, chart } = this.state;
		const { timeInterval } = this.props;

		if (timeInterval !== nextProps.timeInterval) {
			chart.destroy();
			this.createGraph(canvas, nextProps.timeInterval);
		}
	}

	componentDidMount() {
		const { timeInterval } = this.props;

		const canvas = document.getElementById('graph');
		this.setState({ canvas });
		this.createGraph(canvas, timeInterval);
	}

	createGraph(canvas, timeInterval) {
		this.setState({ chart: new Chart(canvas, {
			type: 'pie',
			data: this.getData(timeInterval),
			options: {
				// responsive: false,
				legend: {
					labels: {
						boxWidth: 14,
						fontSize: 16,
						fontStyle: 'bold',
						usePointStyle: true
					}
				},
				tooltips: {
					backgroundColor: 'rgba(0, 0, 0, 0.4)',
					bodyFontSize: 16,
					bodyFontStyle: 'bold',
					xPadding: 10,
					yPadding: 10,
					callbacks: {
						label: ( tooltip, data ) => this.createLabel(tooltip, data)
					}
				}
			}
		})});
	}

	createLabel(tooltip, data) {
		const { totalTime } = this.state;

		if (!tooltip || !data)
			return;

		const { index, datasetIndex } = tooltip;
		const url = data.labels[index];
		const timeActive = data.datasets[datasetIndex].data[index];

		const percentage = Math.round( timeActive / totalTime * 100 );
		
		return [ 
			url + ' (' + percentage + '%)', 
			displayTime(timeActive, true)
		];	
	}

	getData(timeInterval) {
		const { archives, date, websites } = this.props; // From store
	
		let totalTime = 0;
		let data = {
			labels: [], 
			datasets: [{ data: [], backgroundColor: [] }]
		}

		for (const website of websites) {
			const timeActive = getTotalTime(archives, date, timeInterval, website);
			totalTime += timeActive;
			data.labels = [ ...data.labels, website.url ];
			data.datasets[0].data = [ ...data.datasets[0].data, timeActive ];
			data.datasets[0].backgroundColor = [ ...data.datasets[0].backgroundColor, website.color ];
		}

		this.setState({ totalTime });

		return data;
	}

	selectDate(e) {
		const { viewGraph } = this.props;
		const timeInterval = e.target.value;
		
		viewGraph(timeInterval);
	}

	render() {
		const { tooltip, totalTime } = this.state;
		const { back, timeInterval, timeIntervals } = this.props;

		return (
			<div>
				<select className='time-interval' onChange={this.selectDate}>
					<option value={timeInterval}>{displayInterval(timeInterval)}</option>
					{ timeIntervals
						.filter(interval => interval !== timeInterval)
						.map(interval => 
							<option key={interval} value={interval}>
								{ displayInterval(interval) }
							</option> 
					)}
				</select>

				<canvas id='graph' width='400' height='350' />

				<div className='tooltip'>
					<span>{displayTime(totalTime)}</span>				
					<button className='back floatRight' 
						onClick={() => back()}>back</button>
				</div>
			</div>
		);
	}
}

Graph.propTypes = {
	archives: PropTypes.array,
	back: PropTypes.func,
	date: PropTypes.string,
	timeInterval: PropTypes.string,
	timeIntervals: PropTypes.array,
	viewGraph: PropTypes.func,
	websites: PropTypes.array
}