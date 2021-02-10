import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/Login.css';
import webSocket from 'ws';
import { GlobalContext } from '../context/GlobalContext';

type UserInput = {
  category: string,
  number_of_questions: string,
};

const Login: React.FC = React.memo(() => {
  const { socket, setSocket, username, setUsername, rating, setRating } = useContext(GlobalContext);
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = (values : UserInput) => {
    const body = {
      username: values.category,
      number_of_questions: values.number_of_questions,
    };
    axios
      .post('/createGame', body)
      .then((res : any) => {
        if (res.status !== 200) {
          const gameForm = document.getElementsByClassName('createGameForm')[0];
          const div = document.createElement('div');
          div.innerHTML = 'Unable to create a game try again';
          gameForm.appendChild(div);
        } else {
          const ws = new webSocket(res.data[0]);
          setSocket(ws);
          history.push('/lobby');
        }
      })
      .catch((error) => {
        console.log({ ...error });
      });
  };
  return (
    <div className="createGamePage">
      <div className="createGameForm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="number_of_questions">
            Number of Questions
            <input name="number_of_questions" id="number_of_questions" ref={register} />
          </label>
          <label htmlFor="category">
            Category
            <select name="category" id="category" ref={register}>
              <option value="All categories">All Categories</option>
              <option value="Science">Science</option>
            </select>
          </label>
          <div className="submitBtn">
            <input className="generic_button" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
});

export default Login;
