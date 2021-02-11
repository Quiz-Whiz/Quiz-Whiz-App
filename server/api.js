const express = require('express');
const { createUser, verifyUser } = require('./controllers/userController')
const { getSessionToken, getQuestions } = require('./controllers/apiController');
const { createGame, joinPrivateGame } = require('./controllers/gameController');
const router = express.Router();


router.post('/signup', createUser, (req, res) => {
  res.status(200).send('User has been created.');
})

router.post('/login', verifyUser, (req, res) => {
  res.status(200).json(res.locals.user)
})

router.get('/createGame', getSessionToken, getQuestions, createGame, (req, res) => {
  res.status(200).json(res.locals.port)
})

router.post('/joinPrivateGame', joinPrivateGame, (req, res) => {
  if (res.locals.port) {
    res.status(200).json(res.locals.port);
  } else {
    res.status(404).send('No such game exists.')
  }
})

module.exports = router; 