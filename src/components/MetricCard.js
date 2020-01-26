import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Styled from 'styled-components';

const useStyles = makeStyles({
  card: {
    minWidth: 200,
    minHeight: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginLeft: 10,
    marginRight: 10
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function MetricCard({ title, value, targetValue, valueNumber }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const color =
    valueNumber < targetValue + 10 && valueNumber > targetValue - 10
      ? '#00FF00'
      : 'black';

  return (
    <Card className={classes.card}>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <StyledText variant="h5" component="h2" textColor={color}>
        {value}
      </StyledText>
    </Card>
  );
}

const StyledText = Styled(Typography)`
  &&{
    color: ${props => props.textColor}
  }
`;
