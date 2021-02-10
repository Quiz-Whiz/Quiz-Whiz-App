const express = require('express')
const app = express();
const PORT = 3000;
const path = require('path');
const apiRouter = require('./api.js');
require('dotenv').config();

app.use(express.static('client'));

app.use(express.json());

app.use(express.static('client'))

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

//catch-all route handler--for unknown routes
app.use((req, res) => res.sendStatus(404));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
})

