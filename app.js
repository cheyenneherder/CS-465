require("dotenv").config(); // Load environment variables from .env file

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const handlebars = require("hbs");
const passport = require("passport");

require("./app_api/models/db"); // Connect to database
require("./app_api/config/passport"); // Passport configuration

// Import routers
const indexRouter = require("./app_server/routes/index");
const usersRouter = require("./app_server/routes/users");
const travelRouter = require("./app_server/routes/travel");
const apiRouter = require("./app_api/routes/index");

const app = express(); // Initialize Express

// Set up view engine
app.set("views", path.join(__dirname, "app_server", "views"));
handlebars.registerPartials(path.join(__dirname, "/app_server/views/partials"));
app.set("view engine", "hbs");

app.use(logger("dev")); // Logging middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files
app.use(passport.initialize()); // Initialize Passport

// Enable CORS for API requests
app.use("/api", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Define routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/travel", travelRouter);
app.use("/api", apiRouter);

// Handle unauthorized errors
app.use((err, req, res) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: `${err.name}: ${err.message}` });
  }
});

// Handle 404 errors (not found)
app.use((req, res, next) => {
  console.log(`Unhandled route: ${req.method} ${req.url}`);
  next(createError(404));
});

// General error handler
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).render("error");
});

module.exports = app;
