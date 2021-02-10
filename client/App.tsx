import React, {useContext ,useEffect} from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
// import Login
import Login from './components/Login';
// import SignUp
// import MainPage
// import CreateGame
// import JoinGame
import Lobby from './components/Lobby'
// import Game
// import Results

const App: React.FC = React.memo(() => (
  <Switch>
    <Route path="/">
      <Lobby />
    </Route>
    <Route path="/signUp">
    </Route>
    <Route path="/mainPage">
    </Route>
    <Route path="/createGame">
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