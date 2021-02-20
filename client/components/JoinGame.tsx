import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/JoinGame.css';
import { GlobalContext } from '../context/GlobalContext';

type AccessCode = {
  access_code: number
};

const JoinGame: React.FC = React.memo(() => {
  const {
    setSocket, username, setPlayers, setAccessCode, IP,
  } = useContext(GlobalContext);
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = (values : AccessCode) => {
    console.log(values);
    const code = {
      access_code: values.access_code,
    };
    axios
      .post('/api/joinPrivateGame', code)
      .then((res : any) => {
        if (res.status !== 200) {
          // set error state
        } else {
          const port = res.data;
          const URLstring = `ws://${IP}:${port}`;
          setAccessCode(res.data.code);
          const ws = new WebSocket(URLstring);
          ws.onopen = () => {
            setSocket(ws);
            const msg = {
              type: 'joinGame',
              data: `${username}`,
            };
            ws.onmessage = (event:any) => {
              const message = JSON.parse(event.data);
              if (message.type === 'joinGame') {
                setPlayers(message.data);
              }
            };
            ws.send(JSON.stringify(msg));
            history.push('/game');
          };
        }
      })
      .catch((error) => {
        console.log('catch error');
        console.log({ ...error });
      });
  };
  return (
    <div className="joinGame" contentEditable>
      <div className="joinForm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="access_code">
            Access Code:
            <input name="access_code" id="access_code" ref={register} />
          </label>
          <div className="submitBtn">
            <input className="generic_button" type="submit" style={{ color: '#535353' }} />
          </div>
        </form>
      </div>
    </div>
  );
});

export default JoinGame;
