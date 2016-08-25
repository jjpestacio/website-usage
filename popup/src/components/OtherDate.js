import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import './styles/otherDate.css'
import { displayTime, getTotalTime } from '../functions'

@connect(
	state => ({
		archives: state.archives,
		date: state.date
	})
)

export default class OtherDate extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { archives, date } = this.props; // From store
		const { timeInterval, websites } = this.props; // Passed
		
		return (
			<div>
				{ websites.map( website => {
					const totalTime = getTotalTime(archives, date, timeInterval, website);
					return <div key={website.url} className='website reset' onClick={() => viewInfo(website)}>
						<img className='favicon' src={website.faviconUrl} />
						<span className='url'><b>{website.url}</b></span>
						<span className='time'>{displayTime(totalTime)}</span>
					</div> 
				})}
			</div>
		);
	}
}

OtherDate.propTypes = {
	archives: PropTypes.array,
	date: PropTypes.string,
	timeInterval: PropTypes.string,
	websites: PropTypes.array
}