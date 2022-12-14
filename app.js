const express = require('express');
const route = require("./server/routes");
const bodyParser = require("body-parser");
const db = require('./server/database/db')
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');

require("dotenv").config();
const app = express();
const port =  3000;

// require('dotenv').config();
//dotenv.config();

// mongoose.connect(process.env.MONGODB_URI, () => {
//     console.log("CONNECTED TO MONGODB");
// })

db.connect();
app.use(cookieParser());
app.use(express.urlencoded( { extended: true } ));
app.use(express.static(__dirname));
app.use(express.json());

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

route(app);


app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});