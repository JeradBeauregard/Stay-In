const express = require("express");
const router = express.Router();
const services = require('../Services/Services');
// get game by id
router.get('/gamebyid',async (request,response)=>{
    const {id} = request.body;
    const result = await services.GetGameById(id);
    response.json(result);


});
// search games by name -> returns list of games
router.get('/getgamebyname',async (request,response)=>{
    const {name} = request.body;
    const result = await services.searchGameByName(name);
    response.json(result);
    
});
// search games by genre -> returns list of games
router.get('/',async (request,response)=>{
    const {genre} = request.body;
    const result = await services.searchGameGenres
    response.json(result);
    
});

// get random game
router.get('/',async (request,response)=>{
    const result = await services.getRandomGame();
    response.json(result);
    
});
// get recipes for a game
router.get('/',async (request,response)=>{
    const {id} = request.body;
    const result = await services.getRecipes(id);
    response.json(result);
    
});
// get playlists for a game
router.get('/',async (request,response)=>{
    const {id} = request.body;
    const result = await services.getPlaylist(id);
    response.json(result);

    
});


module.exports = router; // Export the router