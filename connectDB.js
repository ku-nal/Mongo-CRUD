const mongoose = require('mongoose');

let client;
async function connectDB(){ 
    try{
        client = await mongoose.connect(process.env.MONGODB_CONNECT_URI);
        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.log("Error connecting to MongoDB "+ error);
    }
}

function getClient(){
    return client;
}
module.exports = {
    connectDB,
    getClient
}