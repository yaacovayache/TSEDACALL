const express = require('express')
require('../00_db/mongoose.js') // Establishes the connection to the database
const cors = require('cors') // Allows our server to receive requests from clients on a different origins
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
// const dotenv = require('dotenv') 
// dotenv.config() // Makes environment variables available

var privateKey  = fs.readFileSync('/etc/letsencrypt/live/tsedacall.com/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/tsedacall.com/fullchain.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

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
app.use(express.static(process.cwd()+"/02_client/tsedacall/dist/tsedacall/"));

var httpsServer = https.createServer(credentials, app);
const port = process.env.PORT || 3000

// Use routes
app.use(userRouter)
app.use(campaignRouter)
app.use(teamRouter)
app.use(paymentRouter)

app.get('/', (req,res) => {
    res.sendFile(process.cwd()+"/02_client/tsedacall/dist/tsedacall/")
});

// rewrite virtual urls to angular app to enable refreshing of internal pages
app.get('*', function (req, res, next) {
    console.log('HERE')
    res.sendFile(process.cwd() + "/02_client/tsedacall/dist/tsedacall/index.html");
});

// Listening for incoming connections
// app.listen(port, () => {
//     console.log(`Listening on port ${port}`)
// })

httpsServer.listen(port, () => {
    console.log(`Listening on port ${port}`)
})