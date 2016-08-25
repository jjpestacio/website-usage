import { ADD_TIME } from '../constants'

const isWatchedWebsite = ( websites, url ) => {
	const matches = websites.filter( website => ~url.indexOf(website.url) );
	let match = { url: '' };
	
	// Just in case there is more than one match
	// The most likely match would be the longest length
	// (e.g. stack vs stackoverflow)
	// If it were meant to be just stack, stackoverflow wouldn't
	// return true from the call to indexOf
	for (const possible of matches)
		match = possible.url.length > match.url.length ? possible : match;

	return match.url.length ? match : null;
}

let timer = null;

export const changeActive = ( store, activeTab ) => {
	const { websites } = store.getState();
	
	// Clear previous timer
	window.clearInterval(timer);

	// check if activeTab is a watched website
	const website = isWatchedWebsite(websites, activeTab.url);

	if (website) {
		timer = window.setInterval(() =>
			store.dispatch({
				type: ADD_TIME,
				payload: website
			})
		, 1000);
	}
}