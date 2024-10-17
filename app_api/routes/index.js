const express = require('express');  // Express app
const router = express.Router();     // Router logic

// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');

// Define route for our trips endpoint
router
  .route('/trips')
  .get(tripsController.tripsList)    // GET Method - Routes tripList
  .post(tripsController.tripsAddTrip); // POST Method - Adds a Trip

// GET Method - Routes trips by tripCode - requires parameter
router
  .route('/trips/:tripCode')
  .get(tripsController.tripByCode); // Make sure it matches the method in trips.js

module.exports = router;
