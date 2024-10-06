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

module.exports = {
    tripsList,
    tripByCode 
};

