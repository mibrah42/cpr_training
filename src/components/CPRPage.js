import React, { useState, useEffect } from 'react';
import CPRDoll from './assets/cpr_doll.png';
import { makeStyles } from '@material-ui/core/styles';
import MetricCard from './MetricCard';
import Game from './Game';

const io = require('socket.io-client');
const ioClient = io.connect('http://localhost:8000');

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
  const [distance, setDistance] = useState();
  const [force, setForce] = useState(0); // aim for 60 lbf
  const [bpm, setBpm] = useState(0); // aim for 100-120 bpm

  const transform = (dataMin, dataMax, resultMin, resultMax, dataValue) => {
    return (
      ((dataValue - dataMin) / (dataValue - dataMax)) * resultMax + resultMin
    );
  };

  // useEffect(() => {
  //   var frequency = function(
  //     maxFrequency,
  //     milliseconds,
  //     updateFrequency,
  //     callback
  //   ) {
  //     var counter = 0,
  //       clearTimer,
  //       start,
  //       delta;

  //     var count = function() {
  //       clearTimeout(clearTimer);

  //       if (!start) {
  //         start = new Date().getTime();
  //       } else {
  //         delta = new Date().getTime() - start;
  //         time.innerText = delta / 1000;
  //         tempo.value = Math.round((60 * 1000 * counter) / delta);

  //         // A sec N times
  //         // 60 sec X times
  //         // X = N * 60 / A
  //       }
  //       counter++;

  //       // Reset counter after 5 seconds
  //       clearTimer = setTimeout(function() {
  //         counter = 0;
  //         delta = 0;
  //         start = 0;
  //         time.innerText = '';
  //         tempo.value = '';
  //       }, 5000);
  //     };
  //   };

  //   frequency(60, 1000, 100, function(
  //     milliseconds,
  //     numberOfClicks,
  //     targetPercentage
  //   ) {
  //     // document.getElementById('numberOfMilliseconds').innerHTML = milliseconds;
  //     console.log('milliseconds', milliseconds);
  //     // document.getElementById('numberOfClicks').innerHTML = numberOfClicks;
  //     console.log('numberOfClicks', numberOfClicks);
  //     // document.getElementById('targetPercentage').innerHTML = targetPercentage;
  //     console.log('targetPercentage', targetPercentage);
  //   });
  // }, []);

  useEffect(() => {
    ioClient.on('pressDistance', pressDistance => {
      console.info('pressDistance', pressDistance);
      setForce(
        pressDistance
          ? Math.min(0, transform(550, 700, 0, 80, pressDistance))
          : 0
      );
    });
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div
        style={{
          height: '100%',
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <MetricCard title="BPM (Beats per minute)" value="18.5" />
            <MetricCard title="Force applied (lbs)" value={`${force} lbs`} />
          </div>
          <div
            style={{
              width: 500,
              height: 500,
              backgroundColor: '#98CABB',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                width: 400,
                height: 400,
                borderRadius: '50%',
                border: '2px solid rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img src={CPRDoll} height={200} />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          height: '100%',
          width: '50%',
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
