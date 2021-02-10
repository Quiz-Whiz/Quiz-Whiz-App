const gameModel = require('../game');

const activeGames = {};

exports.createGame = async (req, res, next) => {
  const game = await new gameModel();
  console.log(game)
  return next();
}

