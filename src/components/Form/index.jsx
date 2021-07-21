import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider, InputBase, Paper, Grid } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postUrl } from "../../store/actions";
import { setLoader } from "../../store/actions/history.action";
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: '100%',
	},
	input: {
		padding: '2px',
		width: '100%',
		flex: 1,
		backgroundColor: '#EAEAEA',
	},
	iconButton: {
		padding: 10,
	},
	divider: {
		height: 28,
		margin: 4,
	},
	btnContainer: {
		width: '100%',
		textAlign: 'center',
	},
	button: {
		backgroundColor: '#EB4A42',
		borderRadius: '3px',
		width: '80%',
	},
	valid: {
		margin: '4px',
		color: 'red',
	},
}));

const FormUrl = ({ isInsert }) => {
  const classes = useStyles();
	const dispatch = useDispatch();
	const [url, setUrl] = useState('');
	const [valid, setValid] = useState(true);
  const { loading } = useSelector(state => state.history);

	const onChange = (event) => {
		setUrl(event.target.value);
		if (event.target.value.match('https?://.+') != null) {
			setValid(true);
		} else {
			setValid(false);
		}
	}

	function shorten () {
		dispatch(
			setLoader({
				state: true,
			})
		);
		setUrl("");
		dispatch(
			postUrl(url)
		)
		isInsert();
	}

  return (
		<Grid container spacing={2} className={classes.root}>
			<Grid item lg={8} sm={12} xs={12}>
				<InputBase
					className={classes.input}
					inputProps={{ 'aria-label': 'Sorten Your URL' }}
					type="url"
					value={url}
					placeholder="http://your-url.com"
					onChange={onChange}
				/>
				{!valid ? <b className={classes.valid}>invalid URL, please include http:// or https://</b> : null}
			</Grid>
			<Grid item lg={4} sm={12} xs={12} className={classes.btnContainer}>
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					onClick={shorten}
					disabled={url === '' || valid === false}
				>
					{' '}
					{loading.state ? 'Loading...' : 'Shorten this Link'}
				</Button>
			</Grid>
		</Grid>
	);
}

export default FormUrl;