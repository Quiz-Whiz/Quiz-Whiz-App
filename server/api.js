
const router = express.Router();

//router.get('/signUp', )


router.get('./getQuestions', getSessionToken, getQuestions, (req, res) => {
  res.status(200).json(res.locals.questions)
}) //gets trivia questions



module.exports = router; 