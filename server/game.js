const http = require('http');
const express = require('express')
const cors = require('cors')
const ws = require('ws');

class Game {
  constructor(questions) {
    this.server = this.createServer();
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
createServer() {
  const app = express();
  const server = new http.Server(app);
  app.use(cors());
  const wss = new ws.Server({ server });
}

//addPlayer
addPlayer(username) {

  this.players[this.playerCount] = {
    username, 
    id: this.genID(),
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