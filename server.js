// require the Express module
const express = require("express");

// creates an instance of an Express server
const app = express();

//allows us to use query strings params,
//paths params, and body all in the request object
app.use(express.json());

// define the port
const port = 3000;

const routes = require('./routes.js');
app.use('/', routes);
// run the server
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});