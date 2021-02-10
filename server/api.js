const express = require('express');
const { createUser, verifyUser } = require('./controllers/userController')
const { getSessionToken, getQuestions } = require('./controllers/apiController');
const router = express.Router();

router.get('/getQuestions', getSessionToken, getQuestions, (req, res) => {
  res.status(200).json(res.locals.questions)
}); //gets trivia questions

router.post('/signup', createUser, (req, res) => {
  res.status(200).send('User has been created.');
})

router.post('/verifyUser', verifyUser, (req, res) => {
  res.status(200).json(res.locals.user)
})

module.exports = router; 