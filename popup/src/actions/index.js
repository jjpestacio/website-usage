import { ADD_WEBSITE, REMOVE_WEBSITE } from '../constants'

export const addWebsite = url => {
	return {
		type: ADD_WEBSITE,
		payload: { url }
	}
}

export const removeWebsite = url => {
	return {
		type: REMOVE_WEBSITE,
		payload: { url }
	}
}
