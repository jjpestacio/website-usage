import { combineReducers } from 'redux'

import { archives } from './archives'
import { date } from './date'
import { websites } from './websites'

export default combineReducers({
	date,
	websites,
	archives
})