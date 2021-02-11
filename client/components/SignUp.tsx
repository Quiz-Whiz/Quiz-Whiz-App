import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalContext';

type UserInput = {
  user_name: string,
  user_password: string,
};

const SignUp: React.FC = React.memo(() => {
  const { username, setUsername, rating, setRating } = useContext(GlobalContext);
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const onSubmit = (values: UserInput) => {
    console.log(values);
    const body = {
      username: values.user_name,
      password: values.user_password,
    };
    axios
      .post('/signup', body)
      .then((res : any) => {
        if (res.status !== 200) {
          const loginForm = document.getElementsByClassName('signupForm')[0];
          const div = document.createElement('div');
          div.innerHTML = 'Username taken';
          loginForm.appendChild(div);
        } else {
          setRating(1000);
          setUsername(values.user_name);
          history.push('/mainpage');
        }
      });
  };
  return (
    <div className="signupPage">
      <div className="signupForm">
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
        {/* need to create a func for guests that generates random username
          and sets rating to 1000
        */}
        <Link className="signup_link" to="/mainpage"> Continue as Guest </Link>
      </div>
    </div>
  );
});

export default SignUp;
