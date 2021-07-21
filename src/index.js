import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Grid } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index.js';
import Home from './views/home/index.jsx';
import './assets/scss/main.scss';

const Index = () => {
	return (
		<Provider store={store}>
			<Grid container justify="center">
				<Home />
			</Grid>
		</Provider>
	);
};

ReactDOM.render(<Index />, document.getElementById('index'));
