'use strict';

console.log('My first server!');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.envPORT || 3002;

app.use(cors());

app.get('/weather',weatherHandler);

app.get('*', (request, response) => {
  response.send('This page does not exist');
});

function weatherHandler(request, response){
  response.send(console.log('weather'));
}

app.listen(PORT,() => console.log(`listening on port ${PORT}`));
