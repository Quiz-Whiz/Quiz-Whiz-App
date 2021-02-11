import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/Login.css';
import { GlobalContext } from '../context/GlobalContext';
import '../stylesheets/CreateGame.css';

type UserInput = {
  category: string,
  number_of_questions: string,
};

const CreateGame: React.FC = React.memo(() => {
  const { setSocket, setHost, username, setPlayers, setAccessCode} = useContext(GlobalContext);
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = (values : UserInput) => {
    const body = {
      // category not mapped yet
      category: values.category,
      amount: values.number_of_questions,
    };
    // ws://localhost:port
    // const ws = new WebSocket('ws://76.214.40.140:3000');
    // ws.onopen = () => {
    //   setSocket(ws);
    //   setHost(true);
    //   history.push('/game');
    // };
    axios
      .post('/api/createGame', body)
      .then((res : any) => {
        if (res.status !== 200) {
          const gameForm = document.getElementsByClassName('createGameForm')[0];
          const div = document.createElement('div');
          div.innerHTML = 'Unable to create a game try again';
          gameForm.appendChild(div);
        } else {
          // import ws
          console.log(res);
          setAccessCode(res.data.code);
          const port = res.data.port;
          const IP = 'ws://76.214.40.140:';
          const URLstring = IP + port;
          console.log(URLstring);
          const ws = new WebSocket(URLstring);
          ws.onopen = () => {
            setSocket(ws);
            setHost(true);
            const msg = {
              type: 'joinGame',
              data: `${username}`,
            };
            ws.send(JSON.stringify(msg));
            history.push('/game');
          };
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
            Number of Questions:
            <input name="number_of_questions" id="number_of_questions" ref={register} />
          </label>
          <br/>
          <br/>
          <label htmlFor="category">
            Category
            <br/>
            <br/>
            <select name="category" id="category" ref={register}>
              <option value="All categories">All Categories</option>
              <option value="Science">Science</option>
            </select>
          </label>
          <br/>
          <br/>
          <br/>
          <div className="submitBtn">
            <input className="generic_button" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
});

export default CreateGame;
