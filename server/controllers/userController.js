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
        if (data.rows.length === 0) return next();
        return next();
      });
    });
  });
};

exports.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  const values = [username];
  const query = 'SELECT * FROM Users WHERE username = $1';
  database.query(query, values, (err, res2) => {
    console.log(res2);
    if (res2.rows.length === 0) {
      res.locals.login = false;
      return next();
    }
    bcrypt.compare(password, res2.rows[0].password, (error, response) => {
      if (!response) {
        res.locals.login = false;
        return next();
      }
      res.locals.login = true;
      res.locals.user = {
        username: res2.rows[0].username,
        rating: res2.rows[0].rating,
      };
      return next();
    });
  });
};
