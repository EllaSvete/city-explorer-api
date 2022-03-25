'use strict';

console.log('My first server!');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3002;
const getWeather = require('./myWeather.js');
const getMovies = require('./movies.js');
// const weatherData = require('./data/weather.json');

//USE
app.use(cors());

//ROUTES
app.get('/weather', getWeather);

app.get('/movies', getMovies);

app.get('*', (request, response) => {
  response.send('This page does not exist');
});

app.use((error, request, response) => {
  response.status(500).send(error.message);
});

app.listen(PORT,() => console.log(`listening on port ${PORT}`));
