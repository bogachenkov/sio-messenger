import React, { Component } from 'react';
import {connect} from 'react-redux';
import {login} from '../store/actions';
import Spinner from './Spinner';

class Login extends Component {

  state = {
    username: '',
    password: ''
  }

  usernameChangeHandler = e => {
    this.setState({
      username: e.target.value
    }) 
   }

  passwordChangeHandler = e => {
   this.setState({
     password: e.target.value
   }) 
  }

  submitHandler = e => {
    e.preventDefault();
    const {username, password} = this.state; 
    const data = {
      username,
      password
    }
    this.props.login(data);
  }

  render() {

    const {username, password} = this.state;
    const {loading, errors} = this.props;

    return (
      <form className="Login" onSubmit={this.submitHandler}>
        {
          loading ? <Spinner />
          :
          <div>
            <h3>Авторизация</h3>
            <input type="text" value={username} placeholder="Имя пользователя" onChange={this.usernameChangeHandler} />
            <input type="password" value={password} placeholder="Пароль" onChange={this.passwordChangeHandler} />
            <input type="submit" value="Войти" />
            {
              Object.keys(errors).length > 0 ? (
                <ul className="Login__errors">
                  <li>{errors.username || errors.password}</li>
                </ul>
              ) : null
            }
          </div>
        }
      </form>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  errors: state.auth.errors
})

const mapDispatchToProps = dispatch => ({
  login: (data) => dispatch(login(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);