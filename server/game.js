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
          const joinReply = {
            type: "joinGame",
            data: Object.keys(this.players)
          }
          console.log(this.players)
          wss.clients.forEach(client => {
            client.send(JSON.stringify(joinReply));
          })
          return;

        case "leaveGame":
          this.removePlayer(message.data)
          const leaveReply = {
            type: "leaveGame",
            data: Object.keys(this.players)
          }
          console.log(this.players)
          wss.clients.forEach(client => {
            client.send(JSON.stringify(leaveReply));
          })
          return;
        
        case "startGame":
          let firstRound = this.sendRound();
          wss.clients.forEach(client => {
            client.send(JSON.stringify(firstRound));
          })
          return;

        case "answer":
          
          this.playerAnswers++;
          
          //increment score for correct answer
          if (message.data.answer) {
            this.players[message.data.username].score += 10;
          }
          
          //if game isn't over, send new question, and results
          if (this.playerAnswers >= this.playerCount) {
            let result = this.sendRound()
            wss.clients.forEach(client => {
              client.send(JSON.stringify(result));
            })
            this.playerAnswers = 0;
          }
          
          this.round++
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
  
  this.players[username] = {
    score: 0,
    answer: null,
  };
  this.playerCount++;
}


//removePlayer
removePlayer(username) {
  delete this.players[username];
  this.playerCount--;
}

sendRound() {
  let currentScores = [];
  for (const player in this.players) {
    currentScores.push({
      username: player,
      score: player.score
    })
  }
  const newRound = {
    type: 'newRound',
    data: this.questions[this.round] || null,
    scores: currentScores,
    isGameOver: this.isGameOver()
  }
  return newRound;
}

//iGO
isGameOver() {
  return this.round >= this.questions.length;
  }
}

module.exports = Game;