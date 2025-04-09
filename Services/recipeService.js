const bgg = require('./bggService');
const axios = require('axios');
const xml2js = require('xml2js'); 

async function getRecipes(gameId) {
  const game = await bgg.getGameById(gameId);


// grab player counts, as integer, set to 0 if value unavailabe
  const minPlayers = parseInt(game.minplayers?.$?.value || 0);
  const maxPlayers = parseInt(game.maxplayers?.$?.value || 0);



  const links = Array.isArray(game.link) ? game.link : [game.link]; // ensure links are an array
  const genreLinks = links.filter(link => link.$.type === 'boardgamecategory'); // get category only links
  const genres = genreLinks.map(link => link.$.value.toLowerCase()); // map link values to genres array
  const genre = genres[0]; // get one genre (category) for our search

  let category = 'Miscellaneous'; // set default category
  // set categories  depending on game info
  if (genre?.includes('party') || maxPlayers >= 5) {
    category = 'Snack'; // 
  } else if (genre?.includes('fantasy')) {
    category = 'Beef';
  } else if (genre?.includes('economic') || genre?.includes('strategy')) {
    category = 'Pasta';
  } else if (maxPlayers <= 2) {
    category = 'Seafood';
  }
  

  const Url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`;
  const Result = await axios.get(Url);
  let meals = Result.data.meals;

  // set fallback meals if there are no meals returned
  if (!meals || meals.length === 0) {

    const fallbackIds = ['52772', '52977', '52804']; // set some ids for the fallback, could make a function to use random ids
    const fallbackMeals = await Promise.all( // promise all runs all requests and returns an array
      fallbackIds.map(async (id) => { // runs map callback to fetch first result of search 
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const res = await axios.get(url);
        return res.data.meals[0]; // returns single meal per request
      })
    );

    return fallbackMeals;
  }

  const shuffled = meals.sort(() => 0.5 - Math.random()).slice(0, 3);

  const Meals = await Promise.all( 
    shuffled.map(async (meal) => {
      const lookupUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`;
      const res = await axios.get(lookupUrl);
      return res.data.meals[0];
    })
  );

  return Meals;
}

module.exports = {
  getRecipes
};
