import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider, Grid } from '@material-ui/core';
import FormUrl from '../../components/Form/index.jsx';
import History from '../../components/History/index.jsx';
import DB from '../../store/lib/idb';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHistory } from '../../store/reducers/history.reducer';
import { setLoader, setHistory } from '../../store/actions/history.action';

const useStyles = makeStyles((theme) => ({
	head: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		marginTop: '20px',
		fontFamily: 'Roboto-Light',
		fontSize: '22px',
	},
	divider: {
		height: 28,
		margin: 8,
	},
	logoContainer: {
		alignSelf: 'flex-end',
		textAlign: 'start',
		marginTop: '22px',
		marginBottom: '44px',
	},
	logo: {
		fontSize: '47px',
		fontFamily: 'Montserrat-Regular',
		color: '#EB4A42',
		fontWeight: '500',
	},
	tagContainer: {
		alignSelf: 'flex-end',
		textAlign: 'end',
		marginTop: '22px',
		marginBottom: '44px',
	},
	tagLine: {
		verticalAlign: 'bottom',
		color: '#AAAAAA',
		fontSize: '16px',
	},
}));

const Home = () => {
	const classes = useStyles();

	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	
	function newData(){
		setRefresh(true);
	};

	async function setUpDatabase() {
		'use strict';
		return await DB.createDB('historyDB', 1, [
			{
				name: 'history',
				config: { keyPath: 'timestamp' },
			},
		]);
	};

	async function getAllDataFromDB() {
		dispatch(
			setLoader({
				state: true,
			})
		);
		// now, initialise the database
		await setUpDatabase();

		// open the database & grab the database object
		let db = await DB.openDB('historyDB', 1);
		const historyStore = await DB.transaction(
			db,
			['history'],
			'readwrite'
		).getStore('history');
		let allData = await DB.getAllObjectData(historyStore);
		let ex = JSON.stringify(allData);
		dispatch(setData(JSON.parse(ex)));
		return allData;
	}

	useEffect(() => {
		getAllDataFromDB();
	}, []);

	useEffect(() => {
		dispatch(setHistory(data));
		dispatch(
			setLoader({
				state: false,
			})
		);
	}, [data]);

	return (
		<div>
			<Grid container direction="row">
				<Grid item lg={6} sm={12} xs={12} className={classes.logoContainer}>
					<span className={classes.logo}>
						<u>Shooooort.</u>
					</span>
				</Grid>
				<Grid item lg={6} sm={12} xs={12} className={classes.tagContainer}>
					<span className={classes.tagLine}>The link shortener with long name </span>
				</Grid>
			</Grid>
			<FormUrl isInsert={newData} />
			<div className={classes.head}>
				<h4>Previous shorten by You</h4>
				<Button size="large" color="primary">
					Clear
				</Button>
			</div>
			<History />
		</div>
	);
};

export default Home;