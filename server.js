'use strict';

console.log('My first server!');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.envPORT || 3002;
const weatherData = require('./data/weather.json');

app.use(cors());

app.get('/weather', (request, response) => {
  try {
    // response.send(console.log('weather'));
    let city = request.query.city;
    console.log(city);
    let cityWeather = weatherData.find(location => location.city_name === city);
    console.log(cityWeather);
    let weatherDisplay = [];
    cityWeather.data.forEach(date => {
      let forecast = new Forecast(date);
      weatherDisplay.push(forecast);
    });
    // response.send(cityWeather.map({weatherDisplay}));

    response.send(weatherDisplay);

  } catch (error){
    next(error);
  }
});

app.get('*', (request, response) => {
  response.send('This page does not exist');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


class Forecast {
  constructor(element){
    this.date = element.datetime;
    this.description = element.weather.description;
  }
}




app.listen(PORT,() => console.log(`listening on port ${PORT}`));
