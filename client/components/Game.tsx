import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Lobby from './Lobby';
import Result from './Results';
import GameRound from './GameRound';

const Game: React.FC = () => {
  const { socket, players, setPlayers, results, setResults, showResults, setShowResults, setQuestion, answer, setAnswer, setIncorrectAnswers, previousAnswer, setPreviousAnswer, showGame, setShowGame } = useContext(GlobalContext);

  const gameTime = () => {
    setShowGame(true);
    setShowResults(false);
  };
  setShowGame(true);

  const gameOver = () => {
    setShowResults(false);
  };

  const updateResultsAndQuestions = (message:any) => {
    if (message.data.question !== null) {
      setPreviousAnswer(answer)
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
    return Result(results, previousAnswer);
  }
  if (showGame) {
    return GameRound(answer);
  }
  return Lobby(players);
};

export default Game;
