const services = require('../Services/Services');

const express = require("express");
const router = express.Router();

const he = require('he'); // for decoding

router.get('/details/:id', async (request, response) => {
  const { id } = request.params;
  const details = await services.GetGameById(id);
  const recipes = await services.getRecipes(id);
  const playlists = await services.getPlaylist(id);

  // check for description and remove line breaks. This API is straight out of 2007 I swear
  if (details && details.description) {
    details.description = he.decode(details.description).replace(/&#10;|\n/g, '');
  }

  response.render("details", { game: details, recipes: recipes, playlists: playlists});
});


router.get('/explorer', async (req, res) => {
    const query = req.query.query;
    const games = query ? await services.searchGameByName(query) : [];
    res.render('explorer', { games, searchTerm: query || '' });
  });

router.get('/', async (request,response)=>{
  const strategy = await services.searchGameGenres('strategy');
  const fantasy = await services.searchGameGenres('fantasy');
  const card = await services.searchGameGenres('card');
  const party = await services.searchGameGenres('party');
  const randomId = await services.getRandomGame();

  response.render('home',{
    strategy : strategy,
    fantasy : fantasy,
    card : card,
    party : party,
    randomId : randomId
});
});


module.exports = router; // Export the router

