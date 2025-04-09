const express = require("express"); // imports express modules
const path = require("path"); // imports node.js pathing modules
//set up Express object and port
const app = express(); // creates express application, allows us to use http requests within app
const port = process.env.PORT || "8888"; // sets up default port for localhost, if a service uses its own itll use that instead
//test message

//set up server listening
app.listen(port, () => { // listens for server 
console.log(`Listening on http://localhost:${port}`); // when server runs callback function console.log executes
});

app.set("views", path.join(__dirname, "views")); //Specifies the views folder where Pug template files are stored.
                                                  //Express will look in this folder when rendering templates.
app.set("view engine", "pug"); // Sets Pug as the template engine.
                                //This allows Express to automatically convert .pug files into HTML when using res.render().

//__dirname: This is a built-in Node.js variable that gives the absolute path of the current directory (where your script is running).

// routing ------

const Routes = require('./Controllers/PageController');
app.use('/',Routes);

const apiRoutes = require('./Controllers/ApiController');
app.use('/api',apiRoutes);


    
    //req: The request object, containing data from the client (like form inputs, headers, etc.).
    //res: The response object, used to send a response back to the client.
    
    // the response is to render the index pug file with the title of "Home", This data is passed to the pug file

    app.use(express.static(path.join(__dirname, "public")));