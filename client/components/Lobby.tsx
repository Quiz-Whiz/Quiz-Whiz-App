import React, { useContext } from 'react';
import '../stylesheets/Login.css';
import { GlobalContext } from '../context/GlobalContext';

const Lobby: React.FC = React.memo(() => {
  // uncomment line 7 and comment line 8-9 to test real functionality
  // const { socket, players} = useContext(GlobalContext);
  const { socket } = useContext(GlobalContext);
  const players = ['vince', 'derek', 'dahomies', 'chance', 'cole'];
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

  return (
    <div className="lobbyPage">
      <div id="users">
        {users}
      </div>
      <label htmlFor="startGame">
        Start Game
        <input type="button" className="buttons" id="startGame" onClick={() => onSubmit()} />
      </label>
    </div>
  );
});

export default Lobby;
