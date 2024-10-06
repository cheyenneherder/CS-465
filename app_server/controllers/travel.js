const http = require('http');

// Helper function to make the API call
const fetchData = (options) => {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let data = '';

            // Collect the data chunks
            res.on('data', (chunk) => {
                data += chunk;
            });

            // On response end, resolve with the parsed data
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                } catch (error) {
                    reject('Error parsing data');
                }
            });
        });

        // Handle request errors
        req.on('error', (error) => {
            reject(`Request error: ${error.message}`);
        });

        req.end(); // End the request
    });
};

// Get data from the API using async/await with error handling
const travel = async (req, res) => {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/trips',
        method: 'GET',
    };

    try {
        console.log("TRAVEL CONTROLLER: BEFORE API REQUEST");

        // Use await to get the data from the API
        const trips = await fetchData(options);

        // Check if the response is an array and not empty
        if (!Array.isArray(trips)) {
            console.log("TRAVEL CONTROLLER: Data lookup error");
            return res.render('travel', { title: 'Travlr Getaways', trips: [], message: "API response is not an array." });
        }

        if (trips.length === 0) {
            console.log("TRAVEL CONTROLLER: No trips exist in our database");
            return res.render('travel', { title: 'Travlr Getaways', trips: [], message: "No trips exist in our database!" });
        }

        // If data exists, render the travel page w/ the trips data
        res.render('travel', { title: 'Travlr Getaways', trips });

        console.log("TRAVEL CONTROLLER: AFTER RENDER");
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving trips data');
    }
};

module.exports = {
    travel,
};
