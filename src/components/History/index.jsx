import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Paper,
	Table,
	Snackbar,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	IconButton,
	Slide
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles({
	table: {
		overflow: 'auto',
	},
	tableRow: {
		'&:hover': {
			'& $copy': {
				visibility: 'visible',
				marginLeft: '12px',
				fontFamily: 'Roboto-Light',
				fontSize: '16px',
				color: '#EB4A42',
			},
		},
	},
	newData: {
		borderLeft: '5px solid red',
		'&:hover': {
			'& $copy': {
				visibility: 'visible',
				marginLeft: '12px',
				fontFamily: 'Roboto-Light',
				fontSize: '16px',
				color: '#EB4A42',
			},
		},
	},
	heading: {
		fontFamily: 'Roboto-Light',
		fontSize: '14px',
		color: '#AAAAAA',
	},
	normal: {
		fontFamily: 'Roboto-Light',
		fontSize: '16px',
	},
	shorten: {
		fontFamily: 'Roboto-Light',
		fontSize: '16px',
		color: '#555555',
	},
	code: {
		fontFamily: 'Roboto-Light',
		fontSize: '16px',
		color: '#EB4A42',
	},
	original: {
		fontFamily: 'Roboto-Light',
		fontSize: '14px',
		color: '#cccccc',
	},
	copy: {
		visibility: 'hidden',
	},
});
const HistoryTable = ({data, loading}) => {
  const classes = useStyles();
	const [copy, setCopy] = React.useState(false);

	const clickRow = (code) => {
		setCopy(true);
		navigator.clipboard.writeText('https://impraise-shorty.herokuapp.com/' + code);
	};
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setCopy(false);
	};

	return (
		<div>
			{loading.state ? <Loader /> : null}
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="caption table">
					<TableHead>
						<TableRow>
							<TableCell className={classes.heading}>LINK</TableCell>
							<TableCell className={classes.heading} align="center">
								VISITS
							</TableCell>
							<TableCell className={classes.heading} align="right">
								CREATED
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data
							.sort(function (a, b) {
								return b.timestamp - a.timestamp;
							})
							.map((d) => (
								<Slide direction="right" in={d.isNew || d} mountOnEnter unmountOnExit>
									<TableRow
										key={d.shortcode}
										onClick={() => clickRow(d.shortcode)}
										className={d.isNew ? classes.newData : classes.tableRow}
									>
										<TableCell component="th" scope="d">
											<a>
												<span className={classes.shorten}>
													shooooort.com/<b className={classes.code}>{d.shortcode}</b>
												</span>
												<span className={classes.copy}>Click to copy this link</span>
											</a>{' '}
											<br></br>
											<span className={classes.original}>{d.url}</span>
										</TableCell>
										<TableCell className={classes.normal} align="center">
											{d.stats.redirectCount}
										</TableCell>
										<TableCell className={classes.normal} align="right">
											{moment(d.stats.startDate).fromNow()}
										</TableCell>
									</TableRow>
								</Slide>
							))}
					</TableBody>
				</Table>
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					open={copy}
					autoHideDuration={3000}
					onClose={handleClose}
					message="Link succesfully copyed!"
					action={
						<React.Fragment>
							<IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
								<CloseIcon fontSize="small" />
							</IconButton>
						</React.Fragment>
					}
				/>
			</TableContainer>
		</div>
	);
}
const NoHistory = () => {
	return <h2 style={{textAlign: 'center'}}>NO HISTORY</h2>
}
const Loader = () => {
	return <h2 style={{ textAlign: 'center' }}>Loading...</h2>;
};
const History = () => {
	const { loading } = useSelector((state) => state.history);
	const { history } = useSelector((state) => state.history);
	const { newData } = useSelector(state => state.history);

	useEffect(() =>{
		history.push(newData);
	}, [newData])
	if (!history.length) {
		return <NoHistory /> 
	} else {
		return <HistoryTable data={history} loading={loading} />;
	}
}

export default History;