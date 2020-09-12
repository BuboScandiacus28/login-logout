import React from 'react';
import Style from './App.module.css';
import Profile from './Profile/Profile';
import {Route, withRouter} from 'react-router-dom';
import Login from './Login/Login';
import {compose} from 'redux';

class App extends React.Component {

  render() {
    return (
      <div className="App">

          <div className={Style.user_page}>

            <Route exact path='/' render={() => <Profile />} />
            <Route path='/profile' render={() => <Profile />} />
            <Route path='/login' render={() => <Login checkSignUp = {false} />} />
            <Route path='/signup' render={() => <Login checkSignUp = {true} />} />

          </div>

      </div>
    );
  }
}

export default compose (
  withRouter
)(App);
