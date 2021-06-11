const mongoose = require('mongoose')


mongoose.connect('mongodb://178.18.246.119:27017/app', {
    auth: {
        user:'tsedacalladmin',
        password:'zwzTD9bfFtTDEMPt'
    },
    authSource:"admin",
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true, 
    useFindAndModify: false
})