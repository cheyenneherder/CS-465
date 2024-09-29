// Bring in the DB connection and the Trip schema
const Mongoose = require('./db');
const Trip = require('./travlr'); 

// Read seed data from json file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('C:\\Users\\cbcxx\\travlr\\data\\trips.json', 'utf8'));

// Delete any existing records, then insert seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    console.log('Deleted existing records.');
    await Trip.insertMany(trips);
    console.log('Inserted new trip records.');
};

// Close the MongoDB connection and exit
seedDB().then(async () => {
    console.log('Seeding completed successfully.');
    await Mongoose.connection.close();
    process.exit(0);
}).catch(err => {
    console.error('Error during seeding:', err);
});

