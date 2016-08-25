import { ADD_ARCHIVE, REMOVE_WEBSITE } from '../constants'

export const archives = ( state={}, action ) => {
	switch (action.type) {
		case ADD_ARCHIVE: {
			let archives = { ...state };

			archives[action.payload.date] = action.payload.websites;
			
			return archives;
		}

		case REMOVE_WEBSITE: {
			let archives = { ...state };

			for (const date in state)
				archives[date].filter( website => website !== action.payload.url );

			return archives;
		}

		default:
			return state;
	}
}