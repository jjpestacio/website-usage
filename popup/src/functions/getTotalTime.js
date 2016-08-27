import moment from 'moment'

import { TODAY, THIS_WEEK, THIS_MONTH, THIS_YEAR } from '../constants'

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
		case TODAY:
			return totalTime;

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