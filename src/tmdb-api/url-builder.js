/*
*  This module returns TMDB API URLs based on the function and media type needed 
*  Author: Kyle McCain
*  Date: 19 March 2020
*/

// Declare and initialize base TMDB URL for all version 3 API Calls
const baseURL = 'https://api.themoviedb.org/3/'

// Declare and initialize new error to throw if required parameter is not inputz
const isRequired = () => { throw new Error('Parameter is required!') }

// Function that returns the URL for broad movie searches
let getMovieSearchURL = (query) => {
    return `${baseURL}search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`
};

// Function that returns the URL for broad TV show searches
let getTVSearchURL = (query) => {
    return `${baseURL}search/tv?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`
};

// // Function that returns the URL for specific movie searches
// let getDetailedMovieSearchURL = () => {
//     return `${baseURL}movie/`;
// };

// // Function that returns the URL for specific TV show searches
// let getDetailedTVSearchURL = () => {
//     return `${baseURL}tv/`;
// };

// // Function that returns the URL for specific movie rating calls
// let getMovieRatingURL = (id = isRequired()) => {
//     return `${baseURL}movie/${id}/rating`;
// };

// // Function that returns the URL for specific TV show rating calls
// let getTVRatingURL = (id = isRequired()) => {
//     return `${baseURL}tv/${id}/rating`
// }

// Export functions for use outside of module
module.exports = {
    getMovieSearchURL,
    getTVSearchURL
    // getDetailedMovieSearchURL,
    // getDetailedTVSearchURL,
    // getMovieRatingURL,
    // getTVRatingURL
}