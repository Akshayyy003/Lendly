const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName : String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    city : String,
    number : {
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
});

module.exports = mongoose.model('User', userSchema);