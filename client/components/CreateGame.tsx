import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/Login.css';
import { GlobalContext } from '../context/GlobalContext';

type UserInput = {
  category: string,
  number_of_questions: string,
};

const CreateGame: React.FC = React.memo(() => {
  const { setSocket, setHost } = useContext(GlobalContext);
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = (values : UserInput) => {
    const body = {
      username: values.category,
      number_of_questions: values.number_of_questions,
    };
    const ws = new WebSocket('ws://76.214.40.140:3000');
    ws.onopen = () => {
      setSocket(ws);
      setHost(true);
      history.push('/game');
    };
    // axios
    //   .post('/createGame', body)
    //   .then((res : any) => {
    //     if (res.status !== 200) {
    //       const gameForm = document.getElementsByClassName('createGameForm')[0];
    //       const div = document.createElement('div');
    //       div.innerHTML = 'Unable to create a game try again';
    //       gameForm.appendChild(div);
    //     } else {
    //       // import ws
    //       setSocket(ws('wss://localhost:3000'));
    //     }
    //   })
    //   .catch((error) => {
    //     console.log({ ...error });
    //   });
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

export default CreateGame;
