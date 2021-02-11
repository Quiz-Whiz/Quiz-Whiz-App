import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/Login.css';
import logo from '../assets/logo.png';
// import context;
import { GlobalContext } from '../context/GlobalContext';

type UserInput = {
  user_name: string,
  user_password: string,
};

const Login: React.FC = React.memo(() => {
  const { username, setUsername, rating, setRating } = useContext(GlobalContext);
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = (values : UserInput) => {
    console.log(values);
    const body = {
      username: values.user_name,
      password: values.user_password,
    };
    axios
      .post('/login', body)
      .then((res : any) => {
        // if status
        if (res.status !== 200) {
          const loginForm = document.getElementsByClassName('loginForm')[0];
          const div = document.createElement('div');
          div.innerHTML = 'Username or Password incorrect';
          loginForm.appendChild(div);
        } else {
          setRating(res.data[0].rating);
          setUsername(values.user_name);
          history.push('/mainpage');
        }
      })
      .catch((error) => {
        console.log({ ...error });
      });
  };
  return (
    <div className="loginPage">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="loginForm">
        <div className="loginHeader">
          <img src={logo} width="260px" height="100px" alt="Logo" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="user_name">
            Username
            <input name="user_name" id="user_name" ref={register} />
          </label>
          <label htmlFor="user_password">
            Password
            <input name="user_password" id="user_password" type="password" ref={register} />
          </label>
          <div className="submitBtn">
            <input className="generic_button" type="submit" />
          </div>
        </form>
        Not registered?
        <br />
        <Link className="signup_link" to="/signUp">Create an Account</Link>
        <br />
        <Link className="main_link" to="/mainPage"> Continue as Guest </Link>
      </div>
    </div>
  );
});

export default Login;
