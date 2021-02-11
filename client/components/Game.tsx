import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Lobby from './Lobby';
import Result from './Results';

const Game: React.FC = () => {
  const { socket, players, setPlayers, results, setResults, showResults, setShowResults, question, setQuestion, answers, setAnswers , setEndGame, showGame, setShowGame } = useContext(GlobalContext);
  let fakePlayers = ['derek', 'cole', 'vince', 'chance', 'RonaldMcdonalds'];

  const gameTime = () => {
    setShowGame(true);
    setShowResults(false);
  };

  const gameOver = () => {
    setShowResults(false);
  };

  socket.onmessage = (event:any) => {
    console.log(event);
    const message = JSON.parse(event.data);
    console.log(message);
    if (message.type === 'results') {
      console.log('SUP IN RESULTS');
      setShowGame(false);
      setShowResults(true);
      setResults([{ username: 'cole', score: 10 }, { username: 'vince', score: 420 }, { username: 'derek', score: 69 }])
      if (message.isGameOver) {
        setTimeout(gameOver, 4000);
      } else {
        setTimeout(gameTime, 4000);
      }
      // add end of game check
    }
  };
  if (showResults) {
    console.log('Rendering Results');
    return Result(results);
  }
  return Lobby(fakePlayers);
};

export default Game;
