require("dotenv/config");

const {MongoClient} = require('mongodb');

let client;

// Connection URI
const uri = process.env.COLLECT_WAY;
const dbName = process.env.WAYPOINT;

// Create a MongoDB client instance
client = new MongoClient(uri, {  });

let isConnected = false;

// Connect to MongoDB
async function connectToMongo() {
    try {
        if(!isConnected) {
            await client.connect();
            isConnected = true;
            console.log('Connected to MongoDB');
            return isConnected;
        } else {
            console.log('Connection is already active');
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        isConnected = false;
        throw error; // Throw error to indicate failure to connect
    }
}
// Get database 
const getDB = () => {
if(!client){
    throw new Error('MongoDB client is not connected');
}
else{
    return client.db(dbName);
}
};

module.exports = { getDB,  connectToMongo };