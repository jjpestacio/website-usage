import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';

import App from './components'

const store = new Store({
	portName: 'APP'
});

// Grab the initial state from the background before rendering
// Read more at https://github.com/tshaddix/react-chrome-redux/wiki/Advanced-Usage
const unsubscribe = store.subscribe(() => { 
	unsubscribe();
	render(
	<Provider store={store}>
		<App />
	</Provider>
	, document.getElementById('root'));
});
