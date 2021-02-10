import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Login 
import Login from './components/Login';
// import SignUp
// import MainPage 
import MainPage from './components/MainPage';
// import CreateGame
// import JoinGame (private)
import JoinGame from './components/JoinGame';
// import Lobby
// import Game
// import Results

const App: React.FC = React.memo(() => (
  <Switch>
    <Route exact path="/">
      <Login />
    </Route>
    <Route path="/signUp">
    </Route>
    <Route path="/mainPage">
      <MainPage />
    </Route>
    <Route path="/createGame">
    </Route>
    <Route path="/joinGame">
      <JoinGame />
    </Route>
    <Route path="/lobby">
    </Route>
    <Route path="/game">
    </Route>
    <Route path="/results">
    </Route>
  </Switch>
));

export default App;
