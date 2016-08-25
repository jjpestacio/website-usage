import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import './styles/popup.css'
import { TODAY, THIS_WEEK, THIS_MONTH, THIS_YEAR } from '../constants'
import { addWebsite, removeWebsite } from '../actions'

import InputForm from './Forms'
import OtherDate from './OtherDate'
import Today from './Today'
import ViewInfo from './ViewInfo'

@connect(
	state => ({
		date: state.date,
		websites: state.websites,
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
			date: TODAY,
			viewWebsite: null,
		}

		this.addWebsite = this.addWebsite.bind(this);
		this.selectDate = this.selectDate.bind(this);
		this.viewInfo = this.viewInfo.bind(this);
	}

	addWebsite(url) {
		const { addWebsite } = this.props;
		addWebsite(url);
	}

	selectDate(e) {
		const date = e.target.value;
		this.setState({ date });
	}

	viewInfo(website) {
		this.setState({ viewWebsite: website });
	}

	render() {
		const { removeWebsite, websites } = this.props;
		const { date, viewWebsite } = this.state;

		if (viewWebsite)
		return (
			<ViewInfo 
				back={() => this.viewInfo(null)}
				remove={url => removeWebsite(url)}
				website={viewWebsite} />
		)

		return (
			<div className='popup'>
				<select className='date' onChange={this.selectDate}>
					<option value={TODAY}>Today</option>
					<option value={THIS_WEEK}>This Week</option>
					<option value={THIS_MONTH}>This Month</option>
					<option value={THIS_YEAR}>This Year</option>
				</select>

				<div className='inputForm'>
					<InputForm 
						buttonStyle={'button'} inputStyle={'input'}
						buttonText='Add' 
						inputText='Add a website by name' 
						submit={url => this.addWebsite(url) }/>
				</div>

				{ date === TODAY 
					? <Today
						websites={websites} 
						viewInfo={website => this.viewInfo(website)} />
					: <OtherDate 
						timeInterval={date} 
						websites={websites} /> 
				}
			</div>
		);
	}
}

App.propTypes = {
	activeWebsite: PropTypes.func,
	addWebsite: PropTypes.func,
	archives: PropTypes.array,
	date: PropTypes.string,
	removeWebsite: PropTypes.func,
	websites: PropTypes.array,
}