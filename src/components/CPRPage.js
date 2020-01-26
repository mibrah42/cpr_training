import React, { useState, useEffect } from 'react';
import CPRDoll from './assets/cpr_doll.png';
import { makeStyles } from '@material-ui/core/styles';
import MetricCard from './MetricCard';
import Game from './Game';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import LeftSide from './LeftSide';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '93vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));


function CPRPage() {
  
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LeftSide />
      <div
        style={{
          height: '100%',
          width: '40%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Game />
      </div>
    </div>
  );
}

export default CPRPage;
