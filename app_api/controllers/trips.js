const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');
const User = mongoose.model('user');

// Function to get the authenticated user based on JWT token
const getUser = (req, res, callback) => {
    if (req.payload && req.payload.email) {
        User
            .findOne({ email: req.payload.email })
            .exec((err, user) => {
                if (!user) {
                    return res.status(404).json({
                        "message": "User not found"
                    });
                } else if (err) {
                    return res.status(404).json(err);
                }
                callback(req, res, user);
            });
    } else {
        return res.status(404).json({
            "message": "No user in request"
        });
    }
};

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    const q = await Model.find({}).exec(); // No filter, return all records

    if (!q) {
        return res.status(404).json({ error: 'No trips found' });
    } else {
        return res.status(200).json(q);
    }
};

// GET: /trips/:tripCode - retrieves a single trip by tripCode
const tripByCode = async (req, res) => {
    const { tripCode } = req.params; // Get tripCode from the URL

    try {
        const trip = await Model.findOne({ code: tripCode }).exec();

        if (!trip) {
            return res.status(404).json({ message: `Trip with code ${tripCode} not found` });
        }

        res.status(200).json(trip);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// POST: /trips - Adds a new trip 
const tripsAddTrip = async (req, res) => {
    getUser(req, res, (req, res, user) => {
        console.log('POST request received at /api/trips with body:', req.body); // Log the request body
        
        const newTrip = new Model({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description,
            user: user._id  // Associating the trip with the user
        });

        newTrip.save((err, trip) => {
            if (err) {
                console.log('Error adding trip:', err.message); // Log any errors
                return res.status(400).json({ message: "Failed to add trip", error: err.message });
            } else {
                console.log('Trip added successfully:', trip); // Log success
                return res.status(201).json(trip);  // Return the new trip
            }
        });
    });
};
// PUT: /trips/:tripCode - Updates an existing trip
const tripsUpdateTrip = async (req, res) => {
    getUser(req, res, (req, res, user) => {
        Trip
            .findOneAndUpdate(
                { 'code': req.params.tripCode },
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                },
                { new: true }  // Returns the updated document
            )
            .then(trip => {
                if (!trip) {
                    return res
                        .status(404)
                        .send({
                            message: "Trip not found with code " + req.params.tripCode
                        });
                }
                res.status(200).json(trip);  // Return the updated trip
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res
                        .status(404)
                        .send({
                            message: "Trip not found with code " + req.params.tripCode
                        });
                }
                return res
                    .status(500) // Server error
                    .json(err);
            });
    });
};
// Export all functions, including the new one
module.exports = {
    tripsList,
    tripByCode,
    tripsAddTrip,
    tripsUpdateTrip  // Added the update method to export
};
