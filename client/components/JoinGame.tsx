import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/JoinGame.css';
import WebSocket from 'ws';

import { GlobalContext } from '../context/GlobalContext';

type AccessCode = {
  access_code: number
};

const JoinGame: React.FC = React.memo(() => {
  const { setSocket } = useContext(GlobalContext);
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = (values : AccessCode) => {
    console.log(values);
    const code = {
      access_code: values.access_code
    };
    axios
      .post('/joinGame', code)
      .then((res : any) => {
        // if status
        if (res.status !== 200) {
          const loginForm = document.getElementsByClassName('joinForm')[0];
          const div = document.createElement('div');
          div.innerHTML = 'Error incorrect access code';
          loginForm.appendChild(div);
        } else {
          const ws = new WebSocket(res.data[0]);
          setSocket(ws);
          ws.on('open', () => {
            history.push('/lobby');
          });
        }
      })
      .catch((error) => {
        console.log({ ...error });
      });
  };
  return (
    <div className="joinGame">
      <div className="joinForm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="access_code">
            Access Code: 
            <input name="access_code" id="access_code" ref={register} />
          </label>
          <div className="submitBtn">
            <input className="generic_button" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
});

export default JoinGame;
