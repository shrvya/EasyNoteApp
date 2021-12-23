const express = require('express');
//require("dotenv").config();
const dbConnect = require('./config/database.user')
// const dbConnectLabel = require('./config/database.label')
const route = require('./app/routes/note.routes');
const routeUser = require('./app/routes/user.route');
const routeLabel = require('./app/routes/label.route');
const logger = require('./utils/logger');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}


// create express app
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/notes',cors(corsOptions), route)
app.use('/users',cors(corsOptions), routeUser)
app.use('/notelabels',routeLabel)
app.use('/images', express.static('app/public'))
// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});
// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
    dbConnect();
    
});
module.exports = app;