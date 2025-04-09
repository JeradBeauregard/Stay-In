# Stay-In

## instructions  

click on explorer to search for a board game. Click on a link to see details with food and music pairings.

## dependencies  

 "axios": "^1.8.4",  
    "express": "^5.1.0",  
    "he": "^1.2.0",  
    "nodemon": "^3.1.9",  
    "pug": "^3.0.3",  
    "spotify-web-api-node": "^5.0.2", 
    "xml2js": "^0.6.2"  

## API RETURN EXAMPLES  

### BGG xml return  

<items>  
  <item type="boardgame" id="12345">  
    <name type="primary" value="Wingspan"/>  
    <description>  
      A competitive bird-collection game where players build habitats and attract birds to their wildlife preserve.  
    </description>  
    <yearpublished value="2019"/>  
    <minplayers value="1"/>  
    <maxplayers value="5"/>  
    <playingtime value="60"/>  
    <statistics>  
      <ratings>  
        <average value="8.2"/>  
        <complexity value="2.39"/>  
      </ratings>  
    </statistics>  
    <link type="boardgamecategory" id="1010" value="Card Game"/>  
    <link type="boardgamecategory" id="1025" value="Economic"/>  
    <link type="boardgamemechanic" id="2048" value="Engine Building"/>  
  </item>  
</items>  

### BGG JSON after parsing  

{  
  items: {  
    item: {  
      $: { type: 'boardgame', id: '12345' },  
      name: [ { $: { type: 'primary', value: 'Wingspan' } } ],  
      description: ['A competitive bird-collection game...'],  
      yearpublished: [ { $: { value: '2019' } } ],  
      minplayers: [ { $: { value: '1' } } ],  
      maxplayers: [ { $: { value: '5' } } ],  
      playingtime: [ { $: { value: '60' } } ],  
      statistics: [ { ratings: [ { average: [ { $: { value: '8.2' } } ], complexity: [ { $: { value: '2.39' } } ] } ] } ],  
      link: [  
        { $: { type: 'boardgamecategory', id: '1010', value: 'Card Game' } },  
        { $: { type: 'boardgamecategory', id: '1025', value: 'Economic' } },  
        { $: { type: 'boardgamemechanic', id: '2048', value: 'Engine Building' } }  
      ]   
    }  
  }    
}  

### RECIPE RETURN  

{  
  "meals": [  
    {  
      "idMeal": "52772",  
      "strMeal": "Teriyaki Chicken Casserole",  
      "strDrinkAlternate": null,  
      "strCategory": "Chicken",  
      "strArea": "Japanese",  
      "strInstructions": "Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray...",  
      "strMealThumb": "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",  
      "strTags": "Meat,Casserole",  
      "strYoutube": "https://www.youtube.com/watch?v=4aZr5hZXP_s",  
      "strIngredient1": "soy sauce",  
      "strIngredient2": "water",  
      "strIngredient3": "brown sugar",  
      "strIngredient4": "ground ginger",  
      "strIngredient5": "minced garlic",  
      "strIngredient6": "cornstarch",  
      "strIngredient7": "chicken breasts",  
      "strIngredient8": "stir-fry vegetables",  
      "strIngredient9": "brown rice",  
      ...  
      "strMeasure1": "3/4 cup",  
      "strMeasure2": "1/2 cup",  
      "strMeasure3": "1/4 cup",  
      "strMeasure4": "1/2 teaspoon",  
      ...  
      "strSource": "https://therecipecritic.com/teriyaki-chicken-casserole/",  
      "dateModified": null  
    }  
  ]  
}  

### spotify playlist return  

{  
  "id": "37i9dQZF1DX4WYpdgoIcn6",  
  "name": "Chill Hits",  
  "description": "Kick back to the best new and recent chill tunes.",  
  "external_urls": {  
    "spotify": "https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6"  
  },  
  "images": [  
    {  
      "url": "https://i.scdn.co/image/ab67706f0000000242b3e6a179c9c74ad3aeb88e",  
      "height": null,  
      "width": null  
    }  
  ],  
  "owner": {  
    "display_name": "Spotify",  
    "external_urls": {  
      "spotify": "https://open.spotify.com/user/spotify"  
    }  
  },  
  "tracks": {  
    "href": "https://api.spotify.com/v1/playlists/37i9dQZF1DX4WYpdgoIcn6/tracks",  
    "total": 100  
  }  
}  
