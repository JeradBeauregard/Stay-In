const services = require('../Services/Services');

const express = require("express");
const router = express.Router();

const he = require('he'); // for decoding

router.get('/details/:id', async (request, response) => {
  const { id } = request.params;
  const details = await services.GetGameById(id);

  // check for description and remove line breaks. This API is straight out of 2007 I swear
  if (details && details.description) {
    details.description = he.decode(details.description).replace(/&#10;|\n/g, '');
  }

  response.render("details", { game: details });
});


router.get('/explorer', async (req, res) => {
    const query = req.query.query;
    const games = query ? await services.searchGameByName(query) : [];
    res.render('explorer', { games, searchTerm: query || '' });
  });


module.exports = router; // Export the router

