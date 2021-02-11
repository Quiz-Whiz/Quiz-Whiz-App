const http = require('http');
const express = require('express')
const cors = require('cors')
const ws = require('ws');
const { createGame } = require('./controllers/gameController');

class Game {
  constructor(questions, port) {
    this.server = this.createServer(port);
    this.players = {};
    this.playerCount = 0;
    this.questions = questions;
    this.round = 0;
    this.playerAnswers = 0;
  };

  //unique user/server number (we hope)
genID() {
  return Math.floor(Math.random() * 100000);
}
//gen websocket server
createServer(port) {
  const app = express();
  const server = new http.Server(app);
  app.use(cors());
  const wss = new ws.Server({ server });
  
  wss.on('connection', (socket) => {
    console.log(`Connected at ${port}!`)
    socket.on('message', (message) => {
      message = JSON.parse(message);
      switch(message.type) {

        case "joinGame":
          this.addPlayer(message.data)
          const playersArray = Object.values(this.players).map(val => val.username)
          const reply = {
            type: "joinGame",
            data: playersArray
          }
          console.log(playersArray);
          wss.clients.forEach(client => {
            client.send(JSON.stringify(reply));
          })
          return;
        
        case "startGame":
          //array index = 0
          //array index++
          //return getCurrentQ()
          return;
        
        case "results":
          return;
        
        case "newRound":
          return;
  
        default: 
          return;
      }
      
    })
  })
  
  server.listen(port)
  return wss;
}

//addPlayer
addPlayer(username) {
  
  this.players[this.genID()] = {
    username, 
    score: 0,
    answer: null,
  };
  this.playerCount++;
}


//removePlayer
removePlayer(id) {
  delete this.players[id];
  this.playerCount--;
}

//getCurrQ
getCurrentQ() {
  return this.questions[this.round];
}

//nextRound
nextRound() {
  this.playerAnswers = 0;
  this.round++;
}

//eHA
//cPA
//getS
updateScore(id, correct) {
  correct? this.players[id].score += 10 : this.players[id].score -= 5;
}

//iGO
isGameOver() {
  return this.round >= this.questions.length;
  }
}

module.exports = Game;