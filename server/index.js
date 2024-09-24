//1. Import all your supports 
//import environment variables from `.env` using `dotenv`
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const fetchData = require('./utils/fetchData')


//checking that our api key is imported to the server?
// console.log(process.env.API_KEY)


//MIDDLEMAN 

//log route 
const logRoutes = (req, res, next) => {
    const time = new Date().toLocaleString();
    console.log(`${req.method}: ${req.originalUrl} - ${time}`);
    next(); // Passes the request to the next middleware/controller
};

//make sure your path to front end is accurate to connect the server (backend) to the front end 
//so your data shows up and the api key is protected.
const pathToFrontendDist = path.join(__dirname, '../giphy-search/dist');
const serveStatic = express.static(pathToFrontendDist);

//controllers
const serveGifs = async (req, res, next) => {
    const API_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=3&rating=g`;
    const [data, error] = await fetchData(API_URL);
    if (error) {
        console.log(error.message);
        return res.status(404).send(error);
    }
    res.send(data);
}

const parseJSON = express.json();

//route functions 
app.use(logRoutes);
app.use(serveStatic);
app.use(parseJSON)

app.get(`/api/gifs`, serveGifs)


//2. put listener at bottom bc express is syncronous and needs all the code ready for when an event occurs
const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));