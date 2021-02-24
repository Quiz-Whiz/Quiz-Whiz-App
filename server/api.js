const express = require('express');
const { createUser, verifyUser } = require('./controllers/userController');
const { getSessionToken, getQuestions } = require('./controllers/apiController');
const { createGame, joinPrivateGame } = require('./controllers/gameController');

const router = express.Router();

router.post('/signup', createUser, (req, res) => {
  if (res.locals.signUp) {
    return res.sendStatus(200);
  }
  res.sendStatus(404);
});

router.post('/login', verifyUser, (req, res) => {
  console.log(res.locals.login);
  if (res.locals.login === true) {
    return res.status(200).json(res.locals.user);
  }
  res.sendStatus(404);
});

router.post('/createGame', getSessionToken, getQuestions, createGame, (req, res) => {
  res.status(200).json(res.locals);
});

router.post('/joinPrivateGame', joinPrivateGame, (req, res) => {
  if (res.locals.port) {
    return res.status(200).json(res.locals.port);
  }
  res.sendStatus(404);
});

module.exports = router;
