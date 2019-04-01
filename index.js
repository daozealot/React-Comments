const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

let sqlite3 = require('sqlite3');
let db = new sqlite3.Database('app/data/sqlitedb');
let bodyParser = require("body-parser");

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allow all Only for development
app.use(cors({ origin: '*' , credentials :  true}));

require('./app/routes')(app, db);

// Handles any requests that don't match the ones above
// app.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

app.listen(port, () => {
    console.log('Backend NodeJS live on ' + port);
});


