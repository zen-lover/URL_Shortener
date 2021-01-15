const mongoose = require('mongoose');
const { promisify } = require('util');
// const asyncRedis = require("async-redis");
const redis = require('redis');

const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
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

// const client = asyncRedis.createClient();
 
// client.on("error", function (err) {
//     console.log("Error " + err);
// });
 
// const asyncBlock = async () => {
//   await client.set("string key", "string val");
//   const value = await client.get("string key");
//   console.log(value);
//   await client.flushall("string key");
// };


// Create Redis Client
let client = redis.createClient();

client.on('connect', function(){
  console.log('Connected to Redis...');
});



module.exports.connectDB = connectDB;
module.exports.client = client;