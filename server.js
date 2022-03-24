'use strict';

console.log('My first server!');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');
const app = express();
const PORT = process.env.PORT || 3002;
// const weatherData = require('./data/weather.json');

//USE
app.use(cors());

//ROUTES
app.get('/weather', async (request, response) => {
  try {
    let city = request.query.city;

    let url = (`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}$country=US&key=${process.env.WEATHER_API_KEY}&units=I&days=7`);

    let returnData = await axios.get(url);
    // console.log(cityWeather);

    let cityWeather = returnData.data;

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

app.get('/movies', async (request, response) => {
  try {
    let city = request.query.city;

    let url = (`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}&total_results=3`);

    let movieData = await axios.get(url);
    console.log(movieData.data.results);

    // let cityMovie = movieData.data;

    let movieDisplay = [];

    movieData.data.results.forEach(title => {

      let movies = new Movies(title);
      movieDisplay.push(movies);
    });
    // response.send(cityWeather.map({weatherDisplay}));
    console.log(movieDisplay);
    response.send(movieDisplay);

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

class Movies {
  constructor (element){
    this.language = element.original_language;
    this.title = element.title;
    this.description = element.overview;
    this.tagline = element.tagline;
  }
}

app.listen(PORT,() => console.log(`listening on port ${PORT}`));
