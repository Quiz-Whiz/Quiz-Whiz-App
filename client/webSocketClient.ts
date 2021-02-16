import { useContext } from 'react';
import { GlobalContext } from './context/GlobalContext';

const ws = (URL:string, history: any) => {
  console.log('hello');
  const {
    username, setPlayers, setQuestion, setGlobalRedirect, setResults,
  } = useContext(GlobalContext);
  const client = new WebSocket(URL);
  client.onopen = () => {
    // add all event listeners before sending any data
    client.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'joinGame') {
        setPlayers(data.info);
        history.push('/lobby');
      }
      if (data.type === 'newRound') {
        setQuestion(data.info);
        const gameTime = history.push('/game');
        setTimeout(() => gameTime, 2000);
      }
      if (data.type === 'results') {
        setGlobalRedirect(true);
        setResults(data.info);
        history.push('/results');
      }
    };
    // send user data before rendering lobbyPage
    const msg = {
      type: 'joinGame',
      username,
    };
    client.send(JSON.stringify(msg));
  };
  return client;
};

export default ws;
