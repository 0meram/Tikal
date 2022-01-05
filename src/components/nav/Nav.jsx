import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	nav: {
		background: "white",
	},
	title: {
		flexGrow: 1,
		color: "black",
		fontWeight: "bold",
	},
}));

export default function Nav() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="fixed" className={classes.nav}>
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						Tikal start wars
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
}
