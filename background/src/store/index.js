import { createStore } from 'redux'
// import { applyMiddleware, compose } from 'redux'

import reducer from '../reducers'

export const configureStore = initialState => {
	return createStore(reducer, initialState)
}
