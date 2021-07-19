const express = require('express')
require('../00_db/mongoose.js') // Establishes the connection to the database
const cors = require('cors') // Allows our server to receive requests from clients on a different origins
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
// const dotenv = require('dotenv') 
// dotenv.config() // Makes environment variables available

// Import mongoose models
const User = require('../00_db/models/user')
const Campaign = require('../00_db/models/campaign')
const Team = require('../00_db/models/team')
const Payment = require('../00_db/models/donation')




// Import routes
const userRouter = require('./routes/user')
const campaignRouter = require('./routes/campaign')
const teamRouter = require('./routes/team')
const paymentRouter = require('./routes/donation')




// Initialize server
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors())

// CORS configuration
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

  
app.use(express.static(process.cwd()+"/html/"));

const port = process.env.PORT || 3000

// Use routes
app.use(userRouter)
app.use(campaignRouter)
app.use(teamRouter)
app.use(paymentRouter)

app.get('/', (req,res) => {
    res.sendFile(process.cwd()+"/html/")
});

// rewrite virtual urls to angular app to enable refreshing of internal pages
app.get('*', function (req, res, next) {
    res.sendFile(process.cwd() + "/html/index.html");
});

// Listening for incoming connections
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})