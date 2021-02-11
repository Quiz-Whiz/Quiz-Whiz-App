const { isJsxOpeningFragment } = require('typescript');
const gameModel = require('../game');

const activeGames = {};
let port = 3001;

exports.createGame = async (req, res, next) => {
  const game = await new gameModel(null, port);
  res.locals.port = port;
  return next();
}

