import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import '../stylesheets/GameRound.css';

const GameRound: React.FC = (answer) => {
  const { question, incorrectAnswers, socket, username } = useContext(GlobalContext);

  const onSubmit = (text:string) => {
    const msg = {
      type: 'answer',
      data: {
        answer: text === answer,
        username,
      },
    };
    console.log(msg);
    socket.send(JSON.stringify(msg));
  };

  const colors = ["#ad229d", "#1ae611", "red", "#eef00b"]

  const answers:JSX.Element[] = [];
  const createAnswerElement = (answerText:string, color:string) => (
    <div className="gameBtn" style={{border: `3px solid ${color}`}}>
      <input style={{width: "100%", height: "100%"}} type="button" value={answerText}  onClick={() => onSubmit(answerText)} />
    </div>
  );
  incorrectAnswers.push(answer);
  const correctAndIncorrect = incorrectAnswers;
  while (correctAndIncorrect.length > 0) {
    const randomChoice = Math.floor(Math.random() * correctAndIncorrect.length);
    const color = colors.splice(randomChoice, 1)
    answers.push(createAnswerElement(correctAndIncorrect[randomChoice], color[0]));
    correctAndIncorrect.splice(randomChoice, 1);
  }

  return (
    <div className="gameRoundPage">
      <div className="gameContainer">
        <div className="gameQuestions" style={{ marginBottom: '30px' }}>
          {question}
        </div>
        <div className="gameAnswers">
          {answers}
        </div>
      </div>
    </div>
  );
};

export default GameRound;
