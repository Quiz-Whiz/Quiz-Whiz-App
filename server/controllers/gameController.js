const GameModel = require('../game');

const activeGames = {};
let port = 3001;

exports.createGame = async (req, res, next) => {
  const game = await new GameModel(res.locals.questions, port);
  res.locals.port = port;
  const code = Math.floor(Math.random() * (90000) + 10000);
  res.locals.code = code;

  activeGames[code] = {
    port,
    game,
  };

  port += 1;
  console.log("I'm active games", activeGames);
  return next();
};

exports.joinPrivateGame = (req, res, next) => {
  const code = req.body.access_code;
  if (activeGames[code]) res.locals.port = activeGames[code].port;
  return next();
};
