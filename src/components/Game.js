import React, { useEffect, useRef, useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import MusicCard from './MusicCard';
import StayingAliveAlbumImage from './assets/staying_alive.jpg';
import soundfile from './assets/stayin_alive_audio.mp3';
import Sound from 'react-sound';
import HumanCPRGif from './assets/humanCPR.gif';
import catCPR from './assets/catCPR.gif';
import { Typography } from '@material-ui/core';

function Game(props) {
  console.log("GAME RENDERED");
  const [start, setStart] = useState(false);
  const [audioStatus, setAudioStatus] = useState('PLAYING');
  const [completed, setCompleted] = useState(false);
  const [ctx, setContext] = useState(null);
  const [displayCountDown, setDisplayCountDown] = useState(false);
  const [countDown, setCountDown] = useState(3);

  const handleOnComplete = () => {
    setCompleted(true);
    setStart(false);
    setAudioStatus('STOPPED');
    setCountDown(3);
  };

  const initCanvas = () => {
    if (ctx != null) {
      Window.draw(ctx, handleOnComplete);
      return;
    }
    const context = Window.initCanvas(handleOnComplete);
    setContext(context);
    setStart(true);
  };

  function startHandle(countDownTimer) {
    setDisplayCountDown(true);
    if (countDownTimer >= 0) {
      setTimeout(() => {
        setCountDown(countDownTimer);
        startHandle(countDownTimer - 1);
      }, 1000);
    } else {
      setDisplayCountDown(false);
      initCanvas();
    }
  }

  const onPlayHandler = useCallback(() => {
    setAudioStatus('PLAYING');
  }, [audioStatus, setAudioStatus]);

  const onPauseHandler = useCallback(() => {
    setAudioStatus('STOPPED');
  }, [audioStatus, setAudioStatus]);

  if (displayCountDown) {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography component="h5" variant="h5" style={{ marginTop: 16 }}>
          Starting in
        </Typography>
        <Typography component="h5" variant="h5" style={{ marginTop: 16 }}>
          {countDown}
        </Typography>
      </div>
    );
  }

  if (completed) {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img src={catCPR} />
        <Typography component="h5" variant="h5" style={{ marginTop: 16 }}>
          Training Complete !
        </Typography>
        <Button
          size="small"
          color="primary"
          variant="contained"
          style={{ marginTop: 16 }}
          href="/heart_hero"
        >
          RESTART
        </Button>
      </div>
    );
  }

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {!start ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img src={HumanCPRGif} />
          <Typography component="h6" variant="h6" style={{ marginTop: 16 }}>
            Get ready !
          </Typography>

          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => startHandle(3)}
            style={{ marginTop: 16 }}
          >
            START TRAINING
          </Button>
        </div>
      ) : null}
      <canvas
        id="canvas"
        width="400"
        height="512"
        style={{ display: start ? 'block' : 'none' }}
      />
      {start ? (
        <>
          <MusicCard
            img={StayingAliveAlbumImage}
            title="Staying Alive"
            artist="Bee Gees"
            onPlay={onPlayHandler}
            onPause={onPauseHandler}
          />
          <Sound
            url={soundfile}
            playFromPosition={83000}
            playStatus={audioStatus}
          />
        </>
      ) : null}
    </div>
  );
}

export default Game;
