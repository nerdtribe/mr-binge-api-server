/*
*  This module is the router for all API calls made for TV show-related information
*  Author: Kyle McCain
*  Date: 19 March 2020
*/

// Setup express variables
const express = require('express');
const router = express.Router();

// Declare TMDB interface modules to use for TMDB API calls
const tmdbURL = require('../src/tmdb-api/url-builder')
const tmdbCall = require('../src/tmdb-api/tmdb-api-interface');

// Broad TV show search request by title
router.get('/search', (req, res) => {
    // Verify tvShowTitle string was included in the request
    if (req.body.tvShowTitle) {
        tmdbCall.tmdbGETRequest(tmdbURL.getTVSearchURL(req.body.tvShowTitle),
            (response, error) => {
                if (response) {
                    console.log(`Successfully conducted a broad TV show search for ${req.body.tvShowTitle}!`);
                    res.status(200).send(response.data);
                }
            })
    } else {
        res.status(400).send('The tvShowTitle argument is missing in your request!')
    }
});

module.exports = router;