import React, { Component, PropTypes } from 'react'

export default class InputForm extends Component {
	constructor(props) {
		super(props);
		this.state = { value: '' }

		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		const { submit } = this.props;
		const { value } = this.state;

		e.preventDefault();

		submit(value);
		this.setState({ value: '' });
	}

	handleTextChange(e) {
		this.setState({ value: e.target.value });
	}

	render() {
		const { value } = this.state;
		const { buttonStyle, inputStyle, buttonText, inputText } = this.props;

		return (
			<form onSubmit={this.handleSubmit}>
				<input className={inputStyle}
					autoComplete='off'
					type='text' 
					placeholder={inputText}
					value={value} 
					onChange={this.handleTextChange} />
				<button className={buttonStyle}
					type='submit'>
					{buttonText}
				</button>
			</form>
		)
	}
}

InputForm.propTypes = {
	buttonStyle: PropTypes.string,
	inputStyle: PropTypes.string,
	buttonText: PropTypes.string.isRequired,
	inputText: PropTypes.string.isRequired,
	submit: PropTypes.func.isRequired
}