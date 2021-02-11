const fetch = require('node-fetch');

exports.getSessionToken = (req, res, next) => {
  
  fetch('https://opentdb.com/api_token.php?command=request')
  .then(response => response.json())
  .then(token => {
    res.locals.token = token.token;
    return next();
  });
  
}

exports.getQuestions = (req, res, next) => {
  
  const token = res.locals.token;
  let url = `https://opentdb.com/api.php?amount=3&type=multiple&token=${token}`;
  fetch(url)
  .then(response => response.json())
  .then(questions => {
    res.locals.questions = questions.results
    return next();
  })
  
}

