import React from 'react'
import moment from 'moment'

import { THIS_WEEK, THIS_MONTH, THIS_YEAR } from '../constants'

const convertDays = time => Math.floor( time / 86400 )
const convertHours = time => Math.floor( time % 86400 / 3600 )
const convertMins = time => Math.floor( time % 3600 / 60 )
const convertSecs = time => Math.floor( time % 60 )

const getMinsAndSecs = time => {
	return (
		<span>
			{convertMins(time)} minutes and {convertSecs(time)} seconds
		</span>
	);
}

const getHoursAndMins = time => {
	return (
		<span>
			{convertHours(time)} hours and {convertMins(time)} minutes
		</span>
	);
}

const getDaysAndHours = time => {
	return (
		<span>
			{convertDays(time)} days and {convertHours(time)} hours
		</span>	
	);
}

export const displayTime = time => {
	if (convertDays(time)) return getDaysAndHours(time);
	else if (convertHours(time)) return getHoursAndMins(time);
	else return getMinsAndSecs(time);
}

export const getTotalTime = ( archives, today, timeInterval, website ) => {

	// Always include today in total time
	let totalTime = website.timeActive; 

	// Create regex from timeInterval
	const day = '[0-9]{2}';
	let month = '[0-9]{2}';
	let year = '[0-9]{4}';
	
	let startOfWeek;

	// Get requested time interval
	switch (timeInterval) {
		case THIS_WEEK: {
			startOfWeek = moment().day(1).format('MM/DD/YYYY'); // This monday
			break;
		}

		case THIS_MONTH:
			month = today.substring(0, 2); // MM/**/****

		case THIS_YEAR:
			year = today.substring(6); // **/**/YYYY

		default:
			break;
	}

	const search = new RegExp( month + '/' + day + '/' + year );

	// For this week
	// search archives for dates | startOfWeek <= date < today 
	if (timeInterval === THIS_WEEK) for (const date of Object.keys(archives)) {
		if (date >= startOfWeek && date < today)
			for (const site of archives[date])
				if (site.url === website.url) {
					totalTime += site.timeActive;
					break;
				}
	}

	// For this month and this year
	// search archives using regex
	else for (const date of Object.keys(archives)) {
		if (date.match(search))
			for (const site of archives[date])
				if (site.url === website.url) {
					totalTime += site.timeActive;
					break;
				}
	}

	return totalTime;
}