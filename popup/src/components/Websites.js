import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import './styles/websites.css'
import { displayTime, getTotalTime } from '../functions'

@connect(
	state => ({
		archives: state.archives,
		date: state.date,
		websites: state.websites
	})
)

export default class Websites extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { archives, date, websites } = this.props; // From store
		const { timeInterval, viewGraph, viewInfo } = this.props; // Passed
		let totalTime = 0;

		return (
			<div>
				{ websites.map( website => {
					const activeTime = getTotalTime(archives, date, timeInterval, website);
					totalTime += activeTime;

					return <div key={website.url} className='website' onClick={() => viewInfo(website)}>
						<img className='favicon' src={website.faviconUrl} 
							onClick={() => viewInfo(website)} />
						<span className='url' 
							onClick={() => viewInfo(website)}><b>{website.url}</b></span>
						<span className='time'>{displayTime(activeTime)}</span>
					</div> 
				})}

				<div className='total-time'>
					<span onClick={() => viewGraph()}>total</span>
					<span className='time'>{displayTime(totalTime)}</span>
				</div>
			</div>
		);
	}
}

Websites.propTypes = {
	archives: PropTypes.array,
	date: PropTypes.string,
	timeInterval: PropTypes.string,
	viewGraph: PropTypes.func,
	viewInfo: PropTypes.func,
	websites: PropTypes.array
}