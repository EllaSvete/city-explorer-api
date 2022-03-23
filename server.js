'use strict';

console.log('My first server!');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3002;
const weatherData = require('./data/weather.json');

app.use(cors());

app.get('/weather', (request, response) => {
  try {
    // response.send(console.log('weather'));
    let city = request.query.city;
    let lat = request.query.lat;
    let lon = request.query.lon;
    console.log(lat, lon, city);
    let cityWeather = weatherData.find(location => location.city_name.toLowerCase() === city.toLowerCase());
    console.log(cityWeather);
    let weatherDisplay = [];
    cityWeather.data.forEach(date => {
      let forecast = new Forecast(date);
      weatherDisplay.push(forecast);
    });
    // response.send(cityWeather.map({weatherDisplay}));
    console.log(weatherDisplay);
    response.send(weatherDisplay);

  } catch (error){
    response.send(error.message);
  }
});

app.get('*', (request, response) => {
  response.send('This page does not exist');
});

app.use((error, request, response) => {
  response.status(500).send(error.message);
});


class Forecast {
  constructor(element){
    this.date = element.datetime;
    this.description = element.weather.description;
  }
}




app.listen(PORT,() => console.log(`listening on port ${PORT}`));
