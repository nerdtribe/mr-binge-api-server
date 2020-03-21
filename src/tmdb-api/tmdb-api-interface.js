/*
*  This module serves as the primary handler for all TMDb API calls
*  Author: Kyle McCain
*  Date: 19 March 2020
*/

// Declare axios to be used for HTTP requests
const axios = require('axios')

// Function that sends a GET request to the TMDb API 
let tmdbGETRequest = (requestURL, callback) => {
  axios.get(requestURL, callback)
    .then(response => callback(response))
    .catch(error => callback(undefined, error));
}

// Function that sends a POST request to the TMDb API 
let tmdbPOSTRequest = (requestURL, options, callback) => {
  axios.post(requestURL, options, callback)
    .then(response => callback(response))
    .catch(error => callback(undefined, error));
}

module.exports = {
  tmdbGETRequest,
  tmdbPOSTRequest
}
