import React from 'react';
import { Typography, Container, Button } from '@material-ui/core';
import CprImage from './assets/cpr.jpg';

function CourseDescriptionPage(props) {
  return (
    <Container
      style={{
        height: '93vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography component="h3" variant="h3">
        CPR Training
      </Typography>
      <img src={CprImage} style={{ marginTop: 16 }} />
      <Typography component="h6" variant="h6" style={{ marginTop: 16 }}>
        Cardiopulmonary resuscitation (CPR) is performed on people who have
        stopped breathing and do not have a pulse. It is vital in
        life-threatening situations like a drowning accident or cardiac arrest.
        The aim of CPR is to compress the chest and heart so that blood can be
        pumped to the brain, albeit weakly. Fast action is required. If CPR is
        not started within two minutes of the heart stopping, brain damage can
        develop rapidly.
      </Typography>
      <div style={{ marginTop: 16 }}>
        <Button
          size="small"
          color="primary"
          variant="contained"
          href="/heart_hero"
        >
          BEGIN
        </Button>
      </div>
    </Container>
  );
}

export default CourseDescriptionPage;
