const { json } = require('body-parser');
const bgg = require('./bggService');

// Board games-------

// GET: /games/search
//Parameters: int players, int genre, int mood 
//Returns: A list of games within set parameters


// Get: /games/random
//Returns: A random game suggestion

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


// Music

// GET: /music/fromGame/:gameId
//Parameters: gameId
//Summary: uses selected game info to select music
//Returns: A list of tracks

module.exports = {GetGameById,
    searchGameByName
};