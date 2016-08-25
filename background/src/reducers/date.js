import { CHANGE_DATE } from '../constants'

export const date = ( state=null, action ) => {
	switch (action.type) {
		case CHANGE_DATE:
			return action.payload;

		default:
			return state;
	}
}