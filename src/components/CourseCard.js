import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
    width: '100%',
    paddingBottom: 10
  },
  media: {
    height: 200
  },
  action: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default function CourseCard({ title, img, disabled, route }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.action}>
        <Button
          size="small"
          color="primary"
          variant="contained"
          disabled={disabled}
          href={route}
        >
          Start Course
        </Button>
      </CardActions>
    </Card>
  );
}
