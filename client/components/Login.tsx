import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import context

type UserInput = {
  user_name: string,
  user_password: string,
};

const Login: React.FC = React.memo(() => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (values : UserInput) => {
    console.log(values);
    const body = {
      username: values.user_name,
      password: values.user_password,
    };
    axios
      .post('/login', body)
      .then((res : any) => console.log(res));
  };
  return (
    <div className="loginPage">

      <div className="loginForm">
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
        <Link className="signup_link" to="/homepage"> Continue as Guest </Link>
      </div>
    </div>
  );
});

export default Login;
