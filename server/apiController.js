
exports.getSessionToken = (req, res, next) => {

  fetch('https://opentdb.com/api_token.php?command=request')
  .then(response => response.json())
  .then(token => res.locals.sessionID = token.token)
  return next();
}

exports.getQuestions = (req, res, next) => {
  const { amount, category } = req.body;
  const token = res.locals.sessionID;


  let url = `https://opentdb.com/api.php?amount=${amount}&category=11&difficulty=medium&type=multiple`

  fetch(url)
  .then(response => response.json())
  .then(questions => res.locals.questions = questions.results)
  return next();
}

