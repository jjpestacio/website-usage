import { 
	ADD_ARCHIVE, ADD_COLORS, ADD_TIME, 
	ADD_WEBSITE, REMOVE_WEBSITE } 
from '../constants'
import { getColor } from '../functions'

export const websites = ( state=[], action ) => {
	switch (action.type) {
		case ADD_COLORS: {
			return state.map( website => {
				return {
					...website,
					color: getColor(website.url)
				}
			});
		}

		// Reset all timeActives
		case ADD_ARCHIVE: {
			return state.map( website => { 
				return {
					...website,
					timeActive: 0
				}
			});
		}

		case ADD_TIME: {
			let activeWebsite = 
				state.filter( website => website.url === action.payload.url )[0];

			activeWebsite.timeActive++;

			return [
				...state.filter( website => website.url !== action.payload.url ),
				activeWebsite
			]
		}

		case ADD_WEBSITE: {
			const checkUrl = action.payload.url.split('.');
		
			// Input should be facebook vs. www.facebook.com or facebook.com
			if (checkUrl.length !== 1) {
				alert('Enter only the name of the website (e.g. Facebook)')
				return state;
			}

			const url = action.payload.url.toLowerCase().replace(" ", "");

			// Use google's favicon bot to retrieve the website's favicon
			// Doesn't handle .org, .net, etc.
			const website = {
				url: url,
				faviconUrl: 'https://plus.google.com/_/favicon?domain=' + url + '.com',
				timeActive: 0,
				color: getColor(url) // For graphing
			}

			return [ ...state, website ];
		}

		case REMOVE_WEBSITE:
			return state.filter( website => website.url !== action.payload.url );

		default:
			return state;
	}
}