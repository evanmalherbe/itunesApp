//Import the express module
const express = require("express");

// Import and run helmet for security
const helmet = require("helmet");

/* I was getting a message that said, "Could not find a declaration file for module 'module-name'. '/path/to/module-name.js' implicitly has an 'any' type", so I found the solution was to create a file called nodefetch.d.ts and did the declaration in there. Learned to do that here:
https://stackoverflow.com/questions/41292559/could-not-find-a-declaration-file-for-module-module-name-path-to-module-nam  */

const path = require("path");

/* Create object called "app". It represents the Express application and has important method like get() and listen() that we will need to use */
const app = express();

// Require Body Parser middleware so Express server can access content that is passed in the body of the HTTP request
const bodyParser = require("body-parser");

const dotenv = require("dotenv");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

dotenv.config();

// Run body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Run Helmet for security
app.use(helmet());

//Import routes
require("./routes/getmedia.js")(app);
require("./routes/changemedia.js")(app);

/* In production, Express needs to serve up resources that have been built from the React app. We allow this by adding the following code to App.js of the Express application. */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// use process.env to get the port number from the environmental variables instead of hard coding it here
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
