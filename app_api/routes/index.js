const express = require('express');  // Express app
const router = express.Router();     // Router logic

// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');

// Define route for our trips endpoint
router
  .route('/trips')
  .get(tripsController.tripsList)    // GET Method - Routes tripList
  .post(tripsController.tripsAddTrip); // POST Method - Adds a Trip

// GET and PUT Method - Routes trips by tripCode (GET and UPDATE/PUT)
router
  .route('/trips/:tripCode')
  .get(tripsController.tripByCode)    // GET Method - Retrieve trip by code
  .put(tripsController.tripsUpdateTrip); // PUT Method - Updates an existing trip

module.exports = router;
