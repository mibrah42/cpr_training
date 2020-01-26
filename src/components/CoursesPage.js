import React from 'react';
import CourseCard from './CourseCard';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Heart from './assets/heart.jpg';
import Meditation from './assets/meditation.jpg';
import MentalHealth from './assets/mental_health.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  courseContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardsContainer: {
    marginTop: 30
  }
}));

function CoursesPage(props) {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.cardsContainer}>
      <Grid container spacing={3}>
        <Grid className={classes.courseContainer} item xs={12} md={6} lg={4}>
          <CourseCard
            title="CPR Training"
            img={Heart}
            disabled={false}
            route="/heart_hero"
          />
        </Grid>
        <Grid className={classes.courseContainer} item xs={12} md={6} lg={4}>
          <CourseCard
            title="Mental Health Assesment"
            img={MentalHealth}
            disabled={true}
            route="/"
          />
        </Grid>
        <Grid className={classes.courseContainer} item xs={12} md={6} lg={4}>
          <CourseCard
            title="Meditation"
            img={Meditation}
            disabled={true}
            route="/"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CoursesPage;
