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
const tmdbImages = require('../src/tmdb-api/images')

// Verify that optional input image sizes are supported formats or attach default values
router.use((req, res, next) => tmdbImages.validPosterSizeMiddleware(req, res, next));
router.use((req, res, next) => tmdbImages.validBackdropSizeMiddleware(req, res, next));

// Broad TV show search request by title
router.get('/search', (req, res) => {
    // Verify tvShowTitle string was included in the request
    if (req.query.tvShowTitle) {
        tmdbCall.tmdbGETRequest(tmdbURL.getTVSearchURL(req.query.tvShowTitle),
            (error, response) => {
                if (response) {
                    console.log(`Successfully conducted a broad TV show search for ${req.query.tvShowTitle}!`);
                    tmdbImages.populateFullImagePaths(response.data, req.query.posterSize, req.query.backdropSize);
                    res.status(200).send(response.data);
                } else if (error) {
                    console.log(`Unable to conduct a broad TV show search for ${req.query.tvShowTitle} due ` +
                    `to the following error:\n${error}`);
                    res.status(404).send(error);
                }
            })
    } else {
        res.status(400).send('The tvShowTitle argument is missing in your request!')
    }
});

// Detailed TV show search request by ID
router.get('/detailed-search', (req, res) => {
    // Verify tvShowID string was included in the request
    if (req.query.tvShowID) {
        tmdbCall.tmdbGETRequest(tmdbURL.getDetailedTVSearchURL(req.query.tvShowID),
            (error, response) => {
                if (response) {
                    console.log(`Successfully conducted a detailed TV show search for ${req.query.tvShowID}!`);
                    tmdbImages.populateFullImagePaths(response.data, req.query.posterSize, req.query.backdropSize);
                    res.status(200).send(response.data);
                } else if (error) {
                    console.log(`Unable to conduct a detailed TV show search for ${req.query.tvShowID} due ` +
                    `to the following error:\n${error}`);
                    res.status(404).send(error);
                }
            })
    } else {
        res.status(400).send('The tvShowID argument is missing in your request!')
    }
});

module.exports = router;