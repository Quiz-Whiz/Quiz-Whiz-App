/* eslint-disable max-len */
import React, { useState } from 'react';

export const GlobalContext = React.createContext<any>(null);

interface Props {
  children: React.ReactNode;
}

export const GlobalProvider = React.memo(({ children }: Props) => {
  const [socket, setSocket] = useState<string>('');
  const [gameID, setGameID] = useState<string>('');
  const [players, setPlayers] = useState<any>([]);
  const [name, setName] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [incorrectAnswers, setIncorrectAnswers] = useState<any>([]);
  const [results, setResults] = useState<any>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showGame, setShowGame] = useState<boolean>(false);
  const [globalRedirect, setGlobalRedirect] = useState<boolean>(false);
  const [host, setHost] = useState<boolean>(false);
  const [endGame, setEndGame] = useState<boolean>(true);
  const [rating, setRating] = useState<number>(1);
  const [username, setUsername] = useState<string>('');
  const [accessCode, setAccessCode] = useState<string>('');

  const value = {
    // eslint-disable-next-line max-len
    socket, setSocket, gameID, setGameID, players, setPlayers, name, setName, question, setQuestion, answer, setAnswer, incorrectAnswers, setIncorrectAnswers, results, setResults, showResults, setShowResults, globalRedirect, setGlobalRedirect, host, setHost, endGame, setEndGame, rating, setRating, username, setUsername, showGame, setShowGame, accessCode, setAccessCode,
  };
  return (<GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>);
});
