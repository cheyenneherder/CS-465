const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

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
    console.log('POST request received at /api/trips with body:', req.body); // Log the request body
    
    const newTrip = new Model({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    try {
        const t = await newTrip.save();
        console.log('Trip added successfully:', t); // Log success
        return res.status(201).json(t);  // Return the new trip
    } catch (error) {
        console.log('Error adding trip:', error.message); // Add this to log any errors
        return res.status(400).json({ message: "Failed to add trip", error: error.message });
    }
};

// Export all functions, including the new one
module.exports = {
    tripsList,
    tripByCode,
    tripsAddTrip // Added this method to export
};
