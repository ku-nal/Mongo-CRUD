const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    firstName: String
})

module.exports = mongoose.model('User', userSchema); 