const express = require('express'); // Express app
const router = express.Router();    // Router logic

// Import the controllers
const tripsController = require('../controllers/trips');

// Define route for our trips endpoint
router
  .route('/trips')
  .get(tripsController.tripsList);  // GET method to list all trips

// Define route for getting a trip by tripCode
router
  .route('/trips/:tripCode')
  .get(tripsController.tripByCode);  // GET method to retrieve trip by tripCode

module.exports = router;
