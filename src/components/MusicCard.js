import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Pause from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    position: 'fixed',
    bottom: 16,
    left: 'calc(50vw - 75.5px)'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 'none'
  },
  content: {
    flex: '1 0 auto',
    paddingBottom: 'none'
  },
  cover: {
    width: 151
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  }
}));

export default function MusicCard({ img, title, artist, onPlay, onPause }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <div style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 16 }}>
          <Typography component="p" variant="body1">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {artist}
          </Typography>
        </div>
        <div className={classes.controls}>
          <IconButton aria-label="play/pause" onClick={onPlay}>
            <PlayArrowIcon />
          </IconButton>
          <IconButton aria-label="previous" onClick={onPause}>
            <Pause />
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={img}
        title="Live from space album cover"
      />
    </Card>
  );
}
