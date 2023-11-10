const mongoose = require("mongoose");

// Creating a schema for user signup !!!
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5,
        max: 255,
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        min: 6,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,   // Hashed password may be lengthy...
    },
    date: {
        type: String,
        default: Date.now,
    },
    currency: {
        type: String,
        default: 'INR', // Default currency
        required: true,
    },
});

const UserSignup = mongoose.model('Users', userSchema);
module.exports = UserSignup;