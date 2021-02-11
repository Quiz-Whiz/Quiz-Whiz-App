const database = require('../database')
const bcrypt = require('bcryptjs');

exports.createUser = (req, res, next) => {
  const { username, password } = req.body;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return next(err);
      else {
        const values = [username, hash, 1000]
        const query = 'INSERT INTO Users (username, password, rating) VALUES ($1, $2, $3)';
        database.query(query, values, (err, res) => {
          if (err) return next(err);
          else return next();
        })
      }
    })
  });
};

exports.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  //query
  const values = [username]
  const query = 'SELECT * FROM Users WHERE username = $1';
  database.query(query, values, (err, res2) => {
    if (err) return next(err);
    else {
      bcrypt.compare(password, res2.rows[0].password, (err, response) => {
        if (!response) return next('incorrect password');

        else {
          res.locals.user = {
            username: res2.rows[0].username,
            rating: res2.rows[0].rating
          };
          return next();
        }
      })
    }
  })
};
