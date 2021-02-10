import React, { useState } from 'react';

export const GlobalContext = React.createContext<any>(null);

interface Props {
  children: React.ReactNode;
}

export const GlobalProvider = React.memo(({ children }: Props) => {
  const [socket, setSocket] = useState<string>('');
  const [gameID, setGameID] = useState<string>('');
  const [players, setPlayers] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [answers, setAnswers] = useState<any>({});
  const [results, setResults] = useState<any>([]);
  const [globalRedirect, setGlobalRedirect] = useState<boolean>(false);
  const [host, setHost] = useState<boolean>(false);
  const [endGame, setEndGame] = useState<number>(0);
  const [rating, setRating] = useState<number>(1000);
  const [username, setUsername] = useState<string>('');

  const value = {
    // eslint-disable-next-line max-len
    socket, setSocket, gameID, setGameID, players, setPlayers, name, setName, question, setQuestion, answers, setAnswers, results, setResults, globalRedirect, setGlobalRedirect, host, setHost, endGame, setEndGame, rating, setRating, username, setUsername,
  };
  return (<GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>);
});
