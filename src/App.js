import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CoursesPage from './components/CoursesPage';
import CPRPage from './components/CPRPage';
import CourseDescriptionPage from './components/CourseDescriptionPage';
// import { Socket } from './components/Socket';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6373CE'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />
        <Router>
          <Switch>
            <Route exact path="/">
              <CoursesPage />
            </Route>
            <Route exact path="/cpr_description">
              <CourseDescriptionPage />
            </Route>
            <Route exact path="/heart_hero">
              <CPRPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
