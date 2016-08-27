import React from 'react'

const convertDays = time => Math.floor( time / 86400 )
const convertHours = time => Math.floor( time % 86400 / 3600 )
const convertMins = time => Math.floor( time % 3600 / 60 )
const convertSecs = time => Math.floor( time % 60 )

const getMinsAndSecs = ( time, string ) => {
	if (string)
		return convertMins(time) + ' minutes and ' + convertSecs(time) + ' seconds';

	return (
		<span>
			{convertMins(time)} minutes and {convertSecs(time)} seconds
		</span>
	);
}

const getHoursAndMins = ( time, string ) => {
	if (string)
		return convertHours(time) + ' hours and ' + convertMins(time) + ' minutes';

	return (
		<span>
			{convertHours(time)} hours and {convertMins(time)} minutes
		</span>
	);
}

const getDaysAndHours = ( time, string ) => {
	if (string)
		return convertDays(time) + ' days and ' + convertHours(time) + ' hours';

	return (
		<span>
			{convertDays(time)} days and {convertHours(time)} hours
		</span>	
	);
}

export const displayTime = ( time, string ) => {
	if (convertDays(time)) return getDaysAndHours(time, string);
	else if (convertHours(time)) return getHoursAndMins(time, string);
	else return getMinsAndSecs(time, string);
}