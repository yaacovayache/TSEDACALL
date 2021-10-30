const express = require('express')
require('../00_db/mongoose.js') // Establishes the connection to the database
const cors = require('cors') // Allows our server to receive requests from clients on a different origins
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const path = require('path');
// const dotenv = require('dotenv') 
// dotenv.config() // Makes environment variables available

// Import mongoose models
const User = require('../00_db/models/user')
const Campaign = require('../00_db/models/campaign')
const Team = require('../00_db/models/team')
const Donation = require('../00_db/models/donation')
const Payment = require('../00_db/models/payment')
const Currency = require('../00_db/models/currency')
const PaymentType = require('../00_db/models/paymentType')




// Import routes
const userRouter = require('./routes/user')
const campaignRouter = require('./routes/campaign')
const teamRouter = require('./routes/team')
const donationRouter = require('./routes/donation')
const paymentRouter = require('./routes/payment')
const cerfaRouter = require('./cerfa/cerfa')
const extraRouter = require('./routes/extra')




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

  
app.use(express.static(path.resolve(__dirname,"../html/")));
// app.use(express.static(path.resolve(__dirname,"../02_client/tsedacall/dist/tsedacall/")));


const port = process.env.PORT || 3000

// Use routes
app.use(userRouter)
app.use(campaignRouter)
app.use(teamRouter)
app.use(donationRouter)
app.use(paymentRouter)
app.use(cerfaRouter)
app.use(extraRouter)

app.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname,"../html/"))
    // res.sendFile(path.resolve(__dirname,"../02_client/tsedacall/dist/tsedacall/"))
});

// rewrite virtual urls to angular app to enable refreshing of internal pages
app.get('*', function (req, res, next) {
    res.sendFile(path.resolve(__dirname,"../html/index.html"));
    // res.sendFile(path.resolve(__dirname,"../02_client/tsedacall/dist/tsedacall/index.html"));
});

// Listening for incoming connections
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})