import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Login 
import Login from './components/Login';
// import SignUp
import SignUp from './components/SignUp';
// import MainPage 
import MainPage from './components/MainPage';
// import CreateGame
import CreateGame from './components/CreateGame';
// import JoinGame (private)
import JoinGame from './components/JoinGame';
// import Lobby
// import Game
// import Results
import Results from './components/Results';

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
    <Route path="/lobby">
    </Route>
    <Route path="/game">
    </Route>
    <Route path="/results">
      <Results />
    </Route>
  </Switch>
));

export default App;
