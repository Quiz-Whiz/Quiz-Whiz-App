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
  const { setUsername, setRating } = useContext(GlobalContext);
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const pushHistory = () => {
    history.push('/mainPage');
  };
  const onSubmit = (values : UserInput) => {
    console.log(values);
    const body = {
      username: values.user_name,
      password: values.user_password,
    };
    axios
      .post('/api/login', body)
      .then((res : any) => {
        // if status
        if (res.status !== 200) {
          const loginForm = document.getElementsByClassName('loginForm')[0];
          const div = document.createElement('div');
          div.innerHTML = 'Username or Password incorrect';
          loginForm.appendChild(div);
        } else {
          setTimeout(pushHistory, 500);
          console.log(res.data);
          setRating(res.data.rating);
          setUsername(values.user_name);
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
        <div className="loginHeader" contentEditable>
          J<span style={{color: "#ad229d"}}>u</span>st Anot<span style={{color: "#1ae611"}}>h</span>er <span style={{color: "red"}}></span> Qu<span style={{color: "#eef00b"}}>i</span>z <span style={{color: "red"}}>A</span>pp
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
        <br />
        <div className="bottomLinks">
          Not registered?
          <br />
          <br />
          <br />
          <Link className="signup_link" to="/signUp">Create an Account</Link>
          <br />
          <br />
          <Link className="main_link" to="/mainPage"> Continue as Guest </Link>
        </div>
      </div>
    </div>
  );
});

export default Login;
