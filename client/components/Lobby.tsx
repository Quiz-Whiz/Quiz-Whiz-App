import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import '../stylesheets/Lobby.css';

const Lobby = (players:string[]) => {
  const { socket, host, accessCode } = useContext(GlobalContext);
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
      <br />
      <br />
    </div>
  );
  for (let i = 0; i < players.length; i += 1) {
    const user = User(players[i]);
    users.push(user);
  }
  if (host === true) {
    startButton = (
      <label htmlFor="startGame">
        <input type="button" value="Start Game" className="buttons" id="startGame" onClick={() => onSubmit()} />
      </label>
    );
  }
  return (
    <div className="lobbyPage" >
      <div className="lobbyContainer">
        <div className="lobbyHeader">
        <span style={{color: "#ad229d"}}>L</span>ob<span style={{color: "#1ae611"}}>b</span>y:
          <br/>
          {accessCode}
        </div>
        <div id="users">
          {users}
        </div>
        <div className="startGameBtn">
           {startButton}
        </div>
      </div>
    </div>
  );
};

export default Lobby;
