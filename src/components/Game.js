import React, { useEffect, useRef, useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import MusicCard from './MusicCard';
import StayingAliveAlbumImage from './assets/staying_alive.jpg';
import soundfile from './assets/stayin_alive_audio.mp3';
import Sound from 'react-sound';

function Game(props) {
  const [start, setStart] = useState(false);
  const [audioStatus, setAudioStatus] = useState('PLAYING');

  const startHandle = () => {
    setStart(true);
  };

  const onPlayHandler = useCallback(() => {
    setAudioStatus('PLAYING');
  }, [audioStatus, setAudioStatus]);

  const onPauseHandler = useCallback(() => {
    setAudioStatus('STOPPED');
  }, [audioStatus, setAudioStatus]);

  useEffect(() => {
    Window.initCanvas();
  }, []);

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
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={startHandle}
        >
          START TRAINING
        </Button>
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
