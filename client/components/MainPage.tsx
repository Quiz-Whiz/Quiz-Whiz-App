import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/MainPage.css';
// import context
import { GlobalContext } from '../context/GlobalContext';

const MainPage: React.FC = React.memo(() => {
  const { username } = useContext(GlobalContext);

  return (
    <div className="mainPage">
      <div className="mainContainer">
        Hello Quiz Whiz
        <br />
        Current Ranking: Over 9000
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Link className="createGame_link" to="/createGame">
          <button className="mainPgBtn" type="button">
            Create Game
          </button>
        </Link>
        <br />
        <Link className="private_link" to="/joinGame">
          <button className="mainPgBtn" type="button">
            Join Private Game
          </button>
        </Link>
        <br />
        <Link className="public_link" to="/game">
          <button className="mainPgBtn" type="button">
            Join Public Game
          </button>
        </Link>
      </div>
    </div>
  );
});

export default MainPage;
