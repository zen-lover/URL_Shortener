const mongoose = require('mongoose');
const redis = require('redis');
const config = require('config');
const db = config.get('mongoURI');

const connectDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
let client = redis.createClient();

client.on('connect', function(){
  console.log('Connected to Redis...');
});



module.exports.connectDb = connectDb;
module.exports.client = client;