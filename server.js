/*
*  This module is the entry point for the Express server used to act as the 
*  API middleware between the Mr Binge application and the TMDB website API
*  Author: Kyle McCain
*  Date: 19 March 2020
*/

// Add environmental variables
require('dotenv').config();

// Setup express variables
const express = require('express');
const app = express();
const port = process.env.PORT;

// Set port for app to listen and print start message
app.listen(port, () => console.log(`Mr Binge API server listening on port ${port}`));

// Allow express to parse incoming JSON files
app.use(express.json());

// Add routes
const movieRouter = require('./routes/movieRouter');
const tvRouter = require('./routes/tvRouter');

// Configure Express app to use all routes
app.use('/api/movies', movieRouter);
app.use('/api/tv', tvRouter);