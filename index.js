const config = require('config');
const { connectDB, client } = require('./config/db');
const mongoose = require('mongoose');
const DeviceDetector = require("device-detector-js");
const express = require('express');
const app = express();


if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}


connectDB();

app.use(express.json());

// Define Routes
app.get('/', (req, res) => {
    const deviceDetector = new DeviceDetector();
    const userAgent = req.get('user-agent');
    const device = deviceDetector.parse(userAgent);
    const browser = device.client.name;
    const type = device.device.type;
    res.send(type);
});
app.use('/r', require('./routes/index'));
app.use('/api/url', require('./routes/url'));
app.use('/api/users', require('./routes/users'));
app.use('/api/report', require('./routes/report'));



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));