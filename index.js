const config = require('config');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const users = require('./routes/users');
const express = require('express');
const app = express();


if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}


connectDB();

app.use(express.json());

// Define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));


app.use(express.json());
app.use('/api/users', users);
app.get('/', (req, res) => {
    res.send('salam');
});



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));