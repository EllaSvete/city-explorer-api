'use strict';
const { default: axios } = require('axios');

async function getWeather(request, response) {
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
}

class Forecast {
  constructor(element){
    this.date = element.datetime;
    this.description = element.weather.description;
  }
}

module.exports = getWeather;
