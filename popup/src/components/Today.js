import React, { Component, PropTypes } from 'react'

import { displayTime } from '../functions'

export default class Today extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { viewInfo, websites } = this.props;

		return (
			<div>
				{ websites.map( website =>
					<div key={website.url} className='website'>
						<img className='favicon' src={website.faviconUrl} 
							onClick={() => viewInfo(website)}/>
						<span className='url' 
							onClick={() => viewInfo(website)}><b>{website.url}</b></span>
						<span className='time'>{displayTime(website.timeActive)}</span>
					</div> 
				)}
			</div>
		);
	}
}

Today.propTypes = {
	viewInfo: PropTypes.func,
	websites: PropTypes.array
}