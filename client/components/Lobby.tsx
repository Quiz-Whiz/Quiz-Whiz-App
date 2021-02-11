import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const Lobby = (players:string[]) => {
  const { socket, host } = useContext(GlobalContext);
  let startButton = (<br />);
  const onSubmit = () => {
    const msg = {
      type: 'startGame',
    };
    socket.send(JSON.stringify(msg));
  };
  const users:JSX.Element[] = [];
  const User = (username: string) => (
    <div>
      {username}
    </div>
  );
  for (let i = 0; i < players.length; i += 1) {
    const user = User(players[i]);
    users.push(user);
  }
  if (host === true) {
    startButton = (
      <label htmlFor="startGame">
        Start Game
        <input type="button" className="buttons" id="startGame" onClick={() => onSubmit()} />
      </label>
    );
  }
  return (
    <div className="lobbyPage">
      <div id="users">
        {users}
      </div>
      {startButton}
    </div>
  );
};

export default Lobby;
