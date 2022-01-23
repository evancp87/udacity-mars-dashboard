require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = 3000;


const Immutable = require('immutable');

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../public')));

// your API calls
const apiKey = process.env.API_KEY;


// const Rovers = Immutable.List([Curiosity, Spirit, Opportunity]);

// const Rovers2 = Rovers.set([1, Perserverance ]);



// app.get('/roverImages', async (req, res) => {
//     try {
//         let image = await fetch(
//             `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`
//         ).then((res) => res.json());
//         res.send({ image });
//     } catch (err) {
//         console.log('error:', err);
//     }
// });
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=${apiKey}

// example API call
// If you just want to receive photo data for the most recent Sol for which photos exist for a particular rover, you can visit the /latest_photos endpoint.

// `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=${apiKey}`
// https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos
// https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/latest_photos

// ** for data

// https://api.nasa.gov/mars-photos/api/v1/manifests/<Rover Name>/
// landing_date
// launch_date
// status
// max_sol
// max_date
// https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity/?api_key=YOUR-API-KEY


// more info here https://github.com/chrisccerami/mars-photo-api#query-for-latest-photos


// const latestImages = (rover, earthDate index) => { 
//app.get(/${rover}/latest_photos, async (req, res) => try { let latestImages = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=apiKey`.then((res) => res.json()).res.send)({image})} catch (error) {console.log('error:', err);})
//})

// const roverImages = (rover, index) => { 
//app.get(/${rover}/latest_photos, async (req, res) => try { let latestImages = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=apiKey`.then((res) => res.json()).res.send)({image})} catch (error) {console.log('error:', err);})
//})
//
//
//}


//When the user clicks on the rovers name the following info change according to the clicked rover:
// - Revor Name.

// - Launch Date.

// - Landing Date.

// - Status.

// - Date Of Most Recent Photos Were Taken.

// - Most Recently Available Photos.


// Fetching rover photos from the Mars api using dynamic router


app.get('/rovers/:rover/', async (req, res) => {
    console.log(req.params);
    console.log(req.query);
    try {
     let roverImages = await fetch (`https://api.nasa.gov/mars-photos/api/v1/rovers/${req.params.rover}/latest_photos?api_key=${apiKey}`)
                .then((res) => res.json()); res.send({roverImages});
            
        } catch (error) {console.log('error:', error);
        }
});



// fetching rover info on the selected rover from the Mars api, preserving the Curiosity rover as the default if none of the others are selected

app.get('manifests/:chosenRover', async (req, res) => {
    const rover = req.params.chosenRover ? req.params.chosenRover : 'Curiosity';
    try {
        const roverInfo = await fetch (`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${apiKey}`)
            .then((res) => res.json()); res.send({roverInfo});
                
    } catch (error) {console.log('error:', error); }
            
});
    


app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`

        ).then((res) => res.json());
        res.send({ image });
    } catch (err) {
        console.log('error:', err);
    }
});

app.listen(port, () => console.log(`Mars Rover Dashboard app listening on port ${port}!`));
