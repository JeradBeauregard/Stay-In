const SpotifyWebApi = require('spotify-web-api-node'); // import spotify
const bgg = require('./bggService'); // import game services
let tokenExpirationTime = 0; // declaration needed


const spotifyApi = new SpotifyWebApi({ // my spotify developer credentials
  clientId: '283b7082d4844b9c9a4c434f433a2e34',
  clientSecret: 'f96374f532ac48b18532da109731ce8b'
});


// Authenticate and set token
async function authorize() {
  const data = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(data.body.access_token);
  tokenExpirationTime = Date.now() + data.body.expires_in * 1000; // set token expiration so we dont make new calls if one already exists
}

async function getPlaylistForGame(gameId) {
  const game = await bgg.getGameById(gameId); // get game info

  if (!spotifyApi.getAccessToken() || Date.now() >= tokenExpirationTime) { // checks if we are already authorize, if not authorize
    await authorize(); // if spotify doesnt have and access token OR the time now is past the expiration time authorize again
  }

  const links = Array.isArray(game.link) ? game.link : [game.link]; // ensures link is an array (sometimes returns one object)
  const genreLinks = links.filter(link => link.$.type === 'boardgamecategory'); // grab category attribute out of links
  const genre = genreLinks[0]?.$.value?.toLowerCase() || 'chill'; // grab genre from genreLinks array, if genreLinks is empty fall back on chill
  const keyword = genre.replace(/[^a-zA-Z0-9\s]/g, '').trim(); // sanitize genre to work with spotify search

  const results = await spotifyApi.searchPlaylists(keyword || 'chill', { limit: 5 }); // fall back on chill if there are any issues
  return results.body.playlists.items || []; 
}



module.exports = { getPlaylistForGame };


