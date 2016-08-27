import { ADD_ARCHIVE, ADD_COLORS, REMOVE_WEBSITE } from '../constants'
import { getColor } from '../functions'

export const archives = ( state={}, action ) => {
	switch (action.type) {
		case ADD_COLORS: {
			let archives = { ...state };

			for (const date in state)
				for (let archive of archives[date])
					archive = { ...archive, color: getColor(archive.url) }

			return archives;
		}

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