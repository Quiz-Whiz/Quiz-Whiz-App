import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Lobby from './Lobby';
import Result from './Results';
import GameRound from './GameRound';

const Game: React.FC = () => {
  const { socket, players, setPlayers, results, setResults, showResults, setShowResults, setQuestion, answer, setAnswer, setIncorrectAnswers, showGame, setShowGame } = useContext(GlobalContext);

  const gameTime = () => {
    setShowGame(true);
    setShowResults(false);
  };

  const gameOver = () => {
    setShowResults(false);
  };

  // {
  //   type: 'firstRound || newRound',
  //   data:  {
    //     "category": "Entertainment: Japanese Anime & Manga",
    //     "type": "multiple",
    //     "difficulty": "easy",
    //     "question": "What is the age of Ash Ketchum in Pokemon when he starts his journey?",
    //     "correct_answer": "10",
    //     "incorrect_answers": [
    //         "11",
    //         "12",
    //         "9"
    //     ]
    // },
  //   scores: [],
  //   isGameOver: this.isGameOver()
  // }
  const updateResultsAndQuestions = (message:any) => {
    if (message.data.question !== null) {
      setQuestion(message.data.question);
      setAnswer(message.data.correct_answer);
      setIncorrectAnswers(message.data.incorrect_answers);
    }
    setResults(message.scores);
  };

  socket.onmessage = (event:any) => {
    const message = JSON.parse(event.data);
    console.log(message);
    if (message.type === 'newRound') {
      console.log('SUP IN new Round');
      setShowGame(false);
      setShowResults(true);
      if (message.isGameOver) {
        setResults(message.scores);
        setTimeout(gameOver, 4000);
      } else {
        updateResultsAndQuestions(message);
        setTimeout(gameTime, 4000);
      }
    }
    if (message.type === 'firstRound') {
      updateResultsAndQuestions(message);
      setShowGame(true);
    }
    if (message.type === 'joinGame') {
      setPlayers(message.data);
    }
  };
  if (showResults) {
    console.log('Rendering Results');
    return Result(results);
  }
  if (showGame) {
    return GameRound(answer);
  }
  return Lobby(players);
};

export default Game;
