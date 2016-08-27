import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import './styles/popup.css'
import { TODAY, THIS_WEEK, THIS_MONTH, THIS_YEAR } from '../constants'
import { addWebsite, removeWebsite } from '../actions'
import { displayInterval } from '../functions'

import Graph from './Graph'
import InputForm from './Forms'
import ViewInfo from './ViewInfo'
import Websites from './Websites'

@connect(
	state => ({
		archives: state.archives
	}),
	dispatch => ({
		addWebsite: url => dispatch(addWebsite(url)),
		removeWebsite: url => dispatch(removeWebsite(url))
	})
)

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timeInterval: TODAY,
			timeIntervals: [ TODAY, THIS_WEEK, THIS_MONTH, THIS_YEAR ],
			viewGraph: false,
			viewWebsite: null,
		}

		this.addWebsite = this.addWebsite.bind(this);
		this.back = this.back.bind(this);
		this.selectDate = this.selectDate.bind(this);
		this.viewInfo = this.viewInfo.bind(this);
	}

	addWebsite(url) {
		const { addWebsite } = this.props;
		addWebsite(url);
	}

	back() {
		this.setState({ viewGraph: false, viewWebsite: null });
	
	}

	selectDate(e) {
		const timeInterval = e.target.value;
		this.setState({ timeInterval });
	}

	viewGraph(timeInterval) {
		this.setState({ timeInterval, viewGraph: true });
	}

	viewInfo(website) {
		this.setState({ viewWebsite: website });
	}

	render() {
		const { removeWebsite } = this.props; // From store
		const { timeInterval, timeIntervals, viewGraph, viewWebsite } = this.state;

		if (viewWebsite)
		return (
			<ViewInfo 
				back={() => this.back()}
				remove={url => removeWebsite(url)}
				website={viewWebsite} />
		);

		if (viewGraph)
		return (
			<Graph
				back={() => this.back()}
				timeInterval={timeInterval}
				timeIntervals={timeIntervals} 
				viewGraph={timeInterval => this.viewGraph(timeInterval)} />
		);

		return (
			<div className='popup'>
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

				<div className='input-form'>
					<InputForm 
						buttonStyle={'button'} inputStyle={'input'}
						buttonText='add' 
						inputText='add a website by name' 
						submit={url => this.addWebsite(url) }/>
				</div>

				<Websites 
					timeInterval={timeInterval}
					viewGraph={() => this.viewGraph(timeInterval)}
					viewInfo={website => this.viewInfo(website)} />
			</div>
		);
	}
}

App.propTypes = {
	activeWebsite: PropTypes.func,
	addWebsite: PropTypes.func,
	archives: PropTypes.array,
	removeWebsite: PropTypes.func,
}