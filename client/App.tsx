import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import MainPage from './components/MainPage';
import CreateGame from './components/CreateGame';
import JoinGame from './components/JoinGame';
import Game from './components/Game';

const App: React.FC = React.memo(() => (
  <Switch>
    <Route exact path="/">
      <Login />
    </Route>
    <Route path="/signUp">
      <SignUp />
    </Route>
    <Route path="/mainPage">
      <MainPage />
    </Route>
    <Route path="/createGame">
      <CreateGame />
    </Route>
    <Route path="/joinGame">
      <JoinGame />
    </Route>
    <Route path="/game">
      <Game />
    </Route>
  </Switch>
));

export default App;
