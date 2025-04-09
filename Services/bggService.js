// this file is intended to convert xml fom 
// Board Game Geeks to JSON for use in this application

/*

Example XML from Board game geeks
<items total="1">
  <item id="13" type="boardgame">
  <name type="primary" value="Catan"/>
  <yearpublished value="1995"/>
</item>
</items>

*/

//getGameById()

// services/bgg.js
const axios = require('axios');
const xml2js = require('xml2js');


const parser = new xml2js.Parser({ explicitArray: false });

async function getGameById(id) {
    const url = `https://boardgamegeek.com/xmlapi2/thing?id=${id}&stats=1`;
  
    try {
      const res = await axios.get(url); // using axios instead of fetch because I'm cool and like to try new things
      const parsed = await parser.parseStringPromise(res.data); // parsing xml data from res to json using xml2js package very mindful very demure
  
      const item = parsed.items.item; // grabs item out of items wrapper ex: <items><item> info </item></items>
      if (!item) return null; // if item does not exist return null to prevent app from breaking oopsies
  
      return item; 
    } catch (error) {
      console.error(`Error fetching game by ID (${id}):`, error.message); 
      throw error;
    }
  }
  

  // search for games by name, for explorer page

async function searchGameByName(query) {
  const url = `https://boardgamegeek.com/xmlapi2/search?query=${encodeURIComponent(query)}&type=boardgame`;

  const res = await axios.get(url);
  const parsed = await parser.parseStringPromise(res.data);

  let games = parsed.items.item;
  if (!games) return []; // return empty array if games is empty

 
  if (!Array.isArray(games)) games = [games]; // change to array if object is returned
  const limitedResults = games.slice(0, 10); // Only show top 10 games --> may change later to be more
  // also BBG does partial search matching automatically which is super cool

  return limitedResults;
}

// getgames for main page, query will be genre

async function searchGameGenres(query){
  const url = `https://boardgamegeek.com/xmlapi2/search?query=${encodeURIComponent(query)}&type=boardgame`;

  const res = await axios.get(url);
  const parsed = await parser.parseStringPromise(res.data);

  let games = parsed.items.item;
  if (!games) return []; // return empty array if games is empty

 
  if (!Array.isArray(games)) games = [games]; // change to array if object is returned
  const limitedResults = games.slice(0, 20); 

  return limitedResults;
}

// get random game

async function getRandomGame(){
  const url = 'https://boardgamegeek.com/xmlapi2/hot?type=boardgame'; // gets a random hot game
  const res = await axios.get(url);
  const parsed = await parser.parseStringPromise(res.data);

  let games = parsed.items.item;
  if (!Array.isArray(games)) games = [games];

  const randomGame = games[Math.floor(Math.random() * games.length)];
  return randomGame.$.id; // Return just the game if for link to details page
}


module.exports = {
  getGameById,
  searchGameByName,
  searchGameGenres,
  getRandomGame
};


