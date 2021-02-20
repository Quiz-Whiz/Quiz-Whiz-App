const bcrypt = require('bcryptjs');
const database = require('../database');

exports.createUser = (req, res, next) => {
  const { username, password } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(password, salt, (error, hash) => {
      if (error) return next(error);
      const values = [username, hash, 1000];
      const query = 'INSERT INTO Users (username, password, rating) VALUES ($1, $2, $3)';
      database.query(query, values, (errors, data) => {
        console.log(data);
        if (data === undefined) {
          res.locals.signUp = false;
          return next();
        }
        res.locals.signUp = true;
        return next();
      });
    });
  });
};

exports.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  const values = [username];
  const query = 'SELECT * FROM Users WHERE username = $1';
  database.query(query, values, (err, data) => {
    if (data.rows.length === 0) {
      res.locals.login = false;
      return next();
    }
    bcrypt.compare(password, data.rows[0].password, (error, response) => {
      if (!response) {
        res.locals.login = false;
        return next();
      }
      res.locals.login = true;
      res.locals.user = {
        username: data.rows[0].username,
        rating: data.rows[0].rating,
      };
      return next();
    });
  });
};
