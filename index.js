const express = require('express');
const config = require('config');

const { connectDb } = require('./config/db');

const app = express();
connectDb();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

app.use(express.json())
app.use('/redirection', require('./routes/redirection'));
app.use('/api/urls', require('./routes/urls'));
app.use('/api/users', require('./routes/users'));
app.use('/api/report', require('./routes/report'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));