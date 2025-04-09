const { json } = require('body-parser');
const bgg = require('./bggService');
const recipe = require('./recipeService');
const spotify = require('./spotifyService');
const axios = require('axios');
const xml2js = require('xml2js');

// Board games-------

// GET: /games/search
//Parameters: int players, int genre, int mood 
//Returns: A list of games within a genre
async function searchGameGenres(query){
    let jsonResult = await bgg.searchGameGenres(query);
    return jsonResult;
}



// Get: /games/random
//Returns: A random game suggestion

async function getRandomGame(){
    let jsonResult = await bgg.getRandomGame();
    return jsonResult;
}

//Get: /games/details/:id
//Parameters: game id
//Returns: A game by id (for details page)
async function GetGameById(id){

    let jsonResult = await bgg.getGameById(id)
    return jsonResult;

    // get variables for recipe and music apis
    // player count
    // genre


}

async function searchGameByName(query){
let jsonResult = await bgg.searchGameByName(query);
return jsonResult;
}


// Recipes--------

// GET: /recipes/fromGame/:gameId
//Parameters: gameId
//Summary: uses selected game info to select recipes
//Returns: A list of recipes

async function getRecipes(gameId) {
    let results = await recipe.getRecipes(gameId);
    return results;
  }


// Music

// GET: /music/fromGame/:gameId
//Parameters: gameId
//Summary: uses selected game info to select music
//Returns: A list of tracks

async function getPlaylist(gameId){
    let results = await spotify.getPlaylistForGame(gameId);
    return results;
}

module.exports = {GetGameById,
    searchGameByName,
    searchGameGenres,
    getRandomGame,
    getRecipes,
    getPlaylist
};