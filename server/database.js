const { Pool } = require('pg');

const database = new Pool({
  connectionString: ''
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query...', text);
    return database.query(text, params, callback);
  },
};