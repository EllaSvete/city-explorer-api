'use strict';
const { default: axios } = require('axios');

let cache = require('./cache.js');

async function getMovies(request, response) {
  try {
    let city = request.query.city;

    //setup cache key
    let key = city + 'Movies';
    //check cache for data
    if (cache[key] && (Date.now() - cache[key].timestamp) < 5000) {
      response.status(200).send(cache[key].data);
    } else {
      let url = (`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}&total_results=3`);

      let movieData = await axios.get(url);
      console.log(movieData.data.results);

      // let cityMovie = movieData.data;

      let movieDisplay = [];

      movieData.data.results.forEach(title => {

        let movies = new Movies(title);
        movieDisplay.push(movies);
      });
      cache[key] = { data: movieDisplay, timestamp: Date.now() };
      response.send(movieDisplay);
    }

  } catch (error) {
    response.send(error.message);
  }
}

class Movies {
  constructor(element) {
    this.language = element.original_language;
    this.title = element.title;
    this.description = element.overview;
    this.tagline = element.tagline;
  }
}

module.exports = getMovies;
