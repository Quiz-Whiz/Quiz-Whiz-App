const express = require('express');
const { createUser, verifyUser } = require('./controllers/userController')
const { getSessionToken, getQuestions } = require('./controllers/apiController');
const { createGame } = require('./controllers/gameController');
const router = express.Router();

router.get('/getQuestions', getSessionToken, getQuestions, (req, res) => {
  res.status(200).json(res.locals.questions)
}); //gets trivia questions

router.post('/signup', createUser, (req, res) => {
  res.status(200).send('User has been created.');
})

router.post('/login', verifyUser, (req, res) => {
  res.status(200).json(res.locals.user)
})

router.get('/createGame', createGame, (req, res) => {
  res.status(200).json(res.locals.port)
})

module.exports = router; 