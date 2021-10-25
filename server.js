const express = require('express');
//require("dotenv").config();
const dbConnect = require('./config/database.user')
const route = require('./app/routes/note.routes');
const routeUser = require('./app/routes/user.route');
const logger = require('./utils/logger');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// create express app
const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/notes', route)
app.use('/users', routeUser)

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});
// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
    dbConnect();
});