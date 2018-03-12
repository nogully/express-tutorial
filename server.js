const express = require('express');
const app = express();
const path = require('path');
const data = require('./public/data.json')

const urlLogger = (request, response, next) => {
  console.log('Request URL:', request.url);
  next();
};

const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString());
  next();
};

app.use(urlLogger, timeLogger);
app.use(express.static('public'));

app.get('/', (request, response) => {
  response.send('hello world');
});

app.get('/json', (request, response) => {
  response.status(200).json(data);
});

app.get('/memes', (request, response) => {
  response.sendFile(path.join(__dirname + '/public/memes.html'));
});

app.use((req, res, next) => {
  res.status(404).send("404 but I still love you")
})

app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
});