/*
*  This module allows for checking input desired image sizes to verify they is 
*  supported. It also builds the image paths that are sent back in API request
*  responses.
*  Author: Kyle McCain
*  Date: 12 July 2020
*/

// Declare and initialize arrays to hold the possible image format values
const supportedPosterSizes = ["w92", "w154", "w185", "w342", "w500", "w780", "original"];
const supportedBackdropSizes = ["w300", "w780", "w1280", "original"];

// Middleware used to check if the query input poster size is supported 
const validPosterSizeMiddleware = (req, res, next) => {
    if (req.query.posterSize) {
        if (supportedPosterSizes.includes(req.query.posterSize)) {
            next();
        } else {
            res.status(400).send('The input poster size is not supported. ' +
            `Please use one of the following options:\n[${supportedPosterSizes}]`)
        }
    } else {
        req.query.posterSize = 'w500';
        next()
    }
}

// Middleware used to check if the query input backdrop size is supported 
const validBackdropSizeMiddleware = (req, res, next) => {
    if (req.query.backdropSize) {
        if (supportedBackdropSizes.includes(req.query.backdropSize)) {
            next();
        } else {
            res.status(400).send('The input backdrop size is not supported. ' +
            `Please use one of the following options:\n[${supportedBackdropSizes}]`)
        }
    } else {
        req.query.backdropSize = 'w780';
        next()
    }
}

// Append each image path in the response for the poster and backdrop images
const populateFullImagePaths = (queryResults, posterSize, backdropSize) => {
    // Check if TMDb response contains a collection of results from a broad search
    if (queryResults.results && queryResults.results.length > 0) {
        queryResults.results.forEach(entry => {
            replacePaths(entry, posterSize, backdropSize);
        });
    // Replace paths for single entry from detailed search
    } else {
        replacePaths(queryResults, posterSize, backdropSize);
    };
}

// Helper function that populates image path if the path isn't 'null'
const replacePaths = (entry, posterSize, backdropSize) => {
    if (entry.poster_path) {
        entry.poster_path = getImagePath(posterSize, entry.poster_path);
    }
    if (entry.backdrop_path) {
        entry.backdrop_path = getImagePath(backdropSize, entry.backdrop_path);
    }
}

// Helper function that returns the full path of an image as a String
const getImagePath = (imageSize, imagePath) => {
    return `https://image.tmdb.org/t/p/${imageSize}${imagePath}`;
}

module.exports = {
    supportedPosterSizes,
    supportedBackdropSizes,
    validPosterSizeMiddleware,
    validBackdropSizeMiddleware,
    populateFullImagePaths
}