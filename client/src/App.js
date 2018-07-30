import React, { Component } from 'react';
import {connect} from 'react-redux';

import Login from './components/Login';
import ChatWrapper from './components/ChatWrapper';

class App extends Component {

  render() {
    return (
      <div className="container">
        <div className="App">
        {
          this.props.isAuth ? 
          <ChatWrapper />
          : <Login /> 
        }
           
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  loading: state.auth.loading
})

export default connect(mapStateToProps)(App);
