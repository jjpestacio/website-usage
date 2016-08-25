import { wrapStore } from 'react-chrome-redux'
import moment from 'moment'

import { changeActive, resetDay } from './functions'
import { configureStore } from './store'

let store;
let openedTabs = {};

// Reset storage
// chrome.storage.sync.clear();

const addListeners = () => {
	// Get active tab
	chrome.tabs.onUpdated.addListener(( tabId, changeInfo, tab ) => {
		if (changeInfo.status === 'complete') {
			openedTabs[tabId] = tab;

			chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
				changeActive(store, tabs[0]);
			});
		}
	});

	// Switched tabs
	chrome.tabs.onActivated.addListener( activeInfo => {

		// Make sure tab is loaded first
		if (openedTabs[activeInfo.tabId]) {
			changeActive(store, openedTabs[activeInfo.tabId]);
		}
	});

	// Window closed
	chrome.windows.onRemoved.addListener(() => {
		chrome.storage.sync.set(store.getState());
	});
}

// Ensure that sync happens first
chrome.storage.sync.get(null, state => {
	
	// Get today's date
	const date = moment().format('MM/DD/YYYY');
	// const date = '08/23/2016';

	// Create store from sync
	store = configureStore(state);
	wrapStore(store, { portName: 'APP' });

	// Reset day if applicable
	if (date !== store.getState().date)
		resetDay(store, date);

	addListeners();
});

