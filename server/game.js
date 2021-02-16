/* eslint-disable no-case-declarations */
const http = require('http');
const express = require('express');
const cors = require('cors');
const ws = require('ws');
const decode = require('decode-html');

class Game {
  constructor(questions, port) {
    this.server = this.createServer(port);
    this.players = {};
    this.playerCount = 0;
    this.questions = questions;
    this.round = 0;
    this.playerAnswers = 0;
  }

  //unique user/server number (we hope)
  genID() {
    return Math.floor(Math.random() * 100000);
  }

  // generate websocket server
  createServer(port) {
    const app = express();
    const server = new http.Server(app);
    app.use(cors());
    const wss = new ws.Server({ server });
    wss.on('connection', (socket) => {
      console.log(`Connected at ${port}!`);
      socket.on('message', (data) => {
        const message = JSON.parse(data);
        switch (message.type) {
          case 'joinGame':
            this.addPlayer(message.data);
            const joinReply = {
              type: 'joinGame',
              data: Object.keys(this.players),
            };
            console.log(this.players);
            wss.clients.forEach((client) => {
              client.send(JSON.stringify(joinReply));
            });
            return;

          case 'leaveGame':
            this.removePlayer(message.data);
            const leaveReply = {
              type: 'leaveGame',
              data: Object.keys(this.players),
            };
            console.log(this.players);
            wss.clients.forEach((client) => {
              client.send(JSON.stringify(leaveReply));
            });
            return;
          case 'startGame':
            this.parseQuestions();
            const firstRound = this.sendRound();
            firstRound.type = 'firstRound';
            wss.clients.forEach((client) => {
              client.send(JSON.stringify(firstRound));
            });
            return;

          case 'answer':
            this.playerAnswers += 1;
            // increment score for correct answer
            if (message.data.answer) {
              this.players[message.data.username].score += 10;
            }

            // if game isn't over, send new question, and results
            if (this.playerAnswers >= this.playerCount) {
              this.round += 1;
              this.playerAnswers = 0;
              const result = this.sendRound();
              wss.clients.forEach((client) => {
                client.send(JSON.stringify(result));
              });
            }
          default: 
            return;
        }
      });
    });
    server.listen(port);
    return wss;
  }

  addPlayer(username) {
    this.players[username] = {
      score: 0,
      answer: null,
    };
    this.playerCount += 1;
  }

  removePlayer(username) {
    delete this.players[username];
    this.playerCount -= 1;
  }

  sendRound() {
    const currentScores = [];
    for (const player in this.players) {
      currentScores.push({
        username: player,
        score: this.players[player].score,
      });
    }
    const newRound = {
      type: 'newRound',
      data: this.questions[this.round] || null,
      scores: currentScores,
      isGameOver: this.isGameOver(),
    };
    return newRound;
  }

  isGameOver() {
    return this.round >= this.questions.length;
  }

  convert(str) {
    str = decode(str);
    str = str.replace(/&#039;/g, "'");
    return str;
  }

  parseQuestions() {
    for (let i = 0; i < this.questions.length; i++) {
      this.questions[i].question = this.convert(this.questions[i].question);
      this.questions[i].correct_answer = this.convert(this.questions[i].correct_answer);
      this.questions[i].incorrect_answers[0] = this.convert(this.questions[i].incorrect_answers[0]);
      this.questions[i].incorrect_answers[1] = this.convert(this.questions[i].incorrect_answers[1]);
      this.questions[i].incorrect_answers[2] = this.convert(this.questions[i].incorrect_answers[2]);
    }
  }
}
module.exports = Game;
