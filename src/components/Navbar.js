import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { Avatar, CardContent } from '@material-ui/core';
import ProfilePic from './assets/profilePic.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  lifeTitle: {
    fontWeight: 700
  },
  trainerTitle: {
    fontWeight: 400,
    opacity: 0.5
  },
  rightBarContent: {
    display: 'flex',
    width: 140,
    justifyContent: 'space-between'
  }
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root} color="primary">
      <AppBar position="static">
        <Toolbar variant="dense" className={classes.toolbar}>
          <Typography
            className={classes.lifeTitle}
            variant="h6"
            color="inherit"
            component="body1"
          >
            LIFE
            <Typography
              className={classes.trainerTitle}
              variant="h6"
              color="inherit"
              component="body1"
            >
              trainer
            </Typography>
          </Typography>
          <div className={classes.rightBarContent}>
            <Button color="inherit" href="/">
              Courses
            </Button>
            <Avatar alt="Profile pic" src={ProfilePic} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
