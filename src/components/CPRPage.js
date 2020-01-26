import React, { useState, useEffect } from 'react';
import CPRDoll from './assets/cpr_doll.png';
import { makeStyles } from '@material-ui/core/styles';
import MetricCard from './MetricCard';
import Game from './Game';
import Button from '@material-ui/core/Button';
import { Line } from 'react-chartjs-2';
import _ from 'lodash';

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

let counter = 0,
  clearTimer,
  start,
  delta;
 const target = new Array(300);
  const data = {
    datasets: [
      {
        label: 'Force over time',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(248,50,47,0.4)',
        borderColor: 'rgba(248,50,47,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(248,50,47,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 0,
        pointHoverBackgroundColor: 'rgba(248,50,47,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 1,
      },
      // {
      //   label: 'Target Force',
      //   borderColor: 'rgba(0,255,0,1)',
      //   borderWidth: 1,
      //   fill: false,
      //   data: target.fill(60)
        
      // }
    ]
  };

function CPRPage() {
  const [distance, setDistance] = useState();
  const [force, setForce] = useState(0); // aim for 60 lbf
  const [bpm, setBpm] = useState(0); // aim for 100-120 bpm
  const [thresholdpass,setThresholdpass] = useState(false);
  const [time, setTime] = useState(0);
  const [tempo, setTempo] = useState(0);
  const [grabData,setGrabData] = useState(data);
  console.log('time', time);
  console.log('tempo', tempo);

  
  const count = function() {
    clearTimeout(clearTimer);
    
    if (!start) {
      start = new Date().getTime();
    } else {
      delta = new Date().getTime() - start;
      const newTime = delta / 1000;
      const newTempo = Math.round((60 * 1000 * counter) / delta);

      setTime(newTime);
      setTempo(newTempo);
      
      // A sec N times
      // 60 sec X times
      // X = N * 60 / A
    }
    counter++;

    // Reset counter after 5 seconds
    clearTimer = setTimeout(function() {
      counter = 0;
      delta = 0;
      start = 0;
      setTime(0);
      setTempo(0);
    }, 2000);
  };

  useEffect(()=>{
    if(!thresholdpass && force> 30){
      setThresholdpass(true);
      count();
    }
    if(thresholdpass && force<30){
      setThresholdpass(false);
    }
  },[force])
  
  const scale = (num, in_min, in_max, out_min, out_max) => {
    return Math.floor((num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
  }

  useEffect(() => {
    ioClient.on('pressDistance', pressDistance => {
      setForce(
        pressDistance
          ? Math.max(0, scale(pressDistance,620,560 , 0, 80))
          : 0
      );
      ;
    });
  }, []);
  useEffect(()=>{
    let id = setInterval(()=>{
      const newGrabData = _.clone(grabData);
      const dataLength = newGrabData.datasets[0].data.length;
      newGrabData.datasets[0].data.unshift(force)
          const labels = [];
          for (let i = 0; i < 300; i++) {
            labels.push(i);
          }
        
          newGrabData.labels = labels;
          const last5minData = _.take(newGrabData.datasets[0].data,300);
          newGrabData.datasets[0].data = last5minData;
         setGrabData(newGrabData)
      
    },1);
    return () => clearInterval(id);
  },[grabData,force]);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <Button
        size="small"
        color="primary"
        variant="contained"
        onClick={() => count()}
      >
        Tap here
      </Button> */}
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
            <MetricCard title="BPM (Beats per minute)" value={`${tempo}`} />
            <MetricCard title="Force applied (lbf)" value={`${force} lbf`} />
            <div style={{
              width:500,
            }}>
            <Line data={grabData} options={{scales:{yAxes:[{
          ticks: {
              beginAtZero:true,
              min: 0,
              max: 80    
          }
        }]}}}/>

            </div>
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
