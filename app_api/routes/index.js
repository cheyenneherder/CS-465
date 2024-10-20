const express = require('express');
const router = express.Router();
//const expressJwt = require('express-jwt');  // Import express-jwt correctly for version 5.3.3

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Add JWT authentication middleware
//const auth = expressJwt({
 // secret: process.env.JWT_SECRET,
 // userProperty: 'payload',
    
//});

// Define route for our trips endpoint
router
  .route('/trips')
  .get(tripsController.tripsList)    // GET Method - Routes tripList
  .post(tripsController.tripsAddTrip); // POST Method - Adds a Trip

// GET and PUT Method - Routes trips by tripCode (GET and UPDATE/PUT)
router
  .route('/trips/:tripCode')
  .get(tripsController.tripByCode)    // GET Method - Retrieve trip by code
  .put(tripsController.tripsUpdateTrip); // Only authenticated users can update trips

// Define routes for authentication (login and register)
router
  .route('/login')
  .post(authController.login);  // Login

router
  .route('/register')
  .post(authController.register);  // Register a new user

module.exports = router;
