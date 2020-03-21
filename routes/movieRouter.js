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
    // Verify movieTitle string was included in the request
    if (req.body.movieTitle) {
        tmdbCall.tmdbGETRequest(tmdbURL.getMovieSearchURL(req.body.movieTitle),
            (response, error) => {
                if (response) {
                    console.log(`Successfully conducted a broad movie search for ${req.body.movieTitle}!`);
                    res.status(200).send(response.data);
                }
            })
    } else {
        res.status(400).send('The movieTitle argument is missing in your request!')
    }
});

module.exports = router;