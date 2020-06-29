/*
*  This module is the router for all API calls made for movie-related information
*  Author: Kyle McCain
*  Date: 19 March 2020
*/

// Setup express variables
const express = require('express');
const router = express.Router();

// Declare TMDB interface modules to use for TMDB API calls
const tmdbURL = require('../src/tmdb-api/url-builder')
const tmdbCall = require('../src/tmdb-api/tmdb-api-interface');

// Broad movie search request by title
router.get('/search', (req, res) => {
    // Verify movieTitle query string was included in the request
    if (req.query.movieTitle) {
        tmdbCall.tmdbGETRequest(tmdbURL.getMovieSearchURL(req.query.movieTitle),
            (error, response) => {
                if (response) {
                    console.log(`Successfully conducted a broad movie search for ${req.query.movieTitle}!`);
                    res.status(200).send(response.data);
                } else if (error) {
                    console.log(`Unable to conduct a broad movie search for ${req.query.movieTitle} due ` +
                    `to the following error:\n${error}`);
                    res.status(404).send(error);
                }
            })
    } else {
        res.status(400).send('The movieTitle argument is missing in your request!')
    }
});

// Detailed movie search request by ID
router.get('/detailed-search', (req, res) => {
    // Verify movieID query string was included in the request
    if (req.query.movieID) {
        tmdbCall.tmdbGETRequest(tmdbURL.getDetailedMovieSearchURL(req.query.movieID),
            (error, response) => {
                if (response) {
                    console.log(`Successfully conducted a detailed movie search for movie ID: ${req.query.movieID}!`);
                    res.status(200).send(response.data);
                } else if (error) {
                    console.log(`Unable to conduct a detailed movie search for movie ID: ${req.query.movieID} due ` +
                    `to the following error:\n${error}`);
                    res.status(404).send(error);
                }
            })
    } else {
        res.status(400).send('The movieID argument is missing in your request!')
    }
});

module.exports = router;