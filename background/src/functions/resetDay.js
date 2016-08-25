import { ADD_ARCHIVE, CHANGE_DATE } from '../constants'

export const resetDay = ( store, date ) => {
	const state = store.getState();

	// Add current state to archives and reset
	// website times to zero
	store.dispatch({
		type: ADD_ARCHIVE,
		payload: { 
			date: state.date, 
			websites: state.websites
		}
	});

	// Change date
	store.dispatch({
		type: CHANGE_DATE,
		payload: date
	});
}