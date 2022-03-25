'use strict';

console.log('My first server!');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3002;
const weather = require('./modules/weather.js');
const movies = require('./modules/movies.js');
const app = express();
app.use(cors());

app.get('/weather', weatherHandler);
app.get('/movies', movies);

function weatherHandler(request, response) {
  const {lat, lon} = request.query;
  weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!');
    });
}

// function movieHandler(request, response) {
//   const {city} = request.query.city;
//   movies(city)
//     .then(summaries => response.send(summaries))
//     .catch((error) => {
//       console.error(error);
//       response.status(200).send('Sorry. Something went wrong!');
//     });
// }

app.listen(PORT, () => console.log(`Server up on ${PORT}`));
