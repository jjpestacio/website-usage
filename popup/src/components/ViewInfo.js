import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import './styles/viewInfo.css'
import { THIS_WEEK, THIS_MONTH, THIS_YEAR } from '../constants'
import { displayTime, getTotalTime } from '../functions'

@connect(
	state => ({
		archives: state.archives,
		date: state.date,
		websites: state.websites,
	})
)

export default class App extends Component {
	constructor(props) {
		super(props);

		this.remove = this.remove.bind(this);
	}

	remove(url) {
		const { back, remove } = this.props;

		remove(url);
		back();
	}

	render() {
		const { archives, date, websites } = this.props; // From store
		const { back, website } = this.props; // Passed

		const timeToday = website.timeActive;
		const timeThisWeek = getTotalTime(archives, date, THIS_WEEK, website);
		const timeThisMonth = getTotalTime(archives, date, THIS_MONTH, website);
		const timeThisYear = getTotalTime(archives, date, THIS_YEAR, website);

		return (
			<div className='info'>
				<div>
					<img className='favicon' src={website.faviconUrl} />
					<span>Here is the time you spent on <b>{website.url}</b>.</span>
				</div>
				<br />
				<div>
					<span><b>Today:</b> {displayTime(timeToday)}</span>
					<br /><span><b>This Week:</b> {displayTime(timeThisWeek)}</span>					
					<br /><span><b>This Month:</b> {displayTime(timeThisMonth)}</span>
					<br /><span><b>This Year:</b> {displayTime(timeThisYear)}</span>		
				</div>
				<br />
				<button className='back' 
					onClick={() => back()}>Back</button>
				<button className='delete' 
					onClick={() => this.remove(website.url)}>Remove</button>
			</div>
		);
	}
}

App.propTypes = {
	archives: PropTypes.array,
	back: PropTypes.func,
	date: PropTypes.string,
	remove: PropTypes.func,
	website: PropTypes.object,
	websites: PropTypes.array,
}