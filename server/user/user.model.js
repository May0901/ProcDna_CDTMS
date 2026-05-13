const mongoose = require('mongoose');

// User Model
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: String
});

module.exports = mongoose.model('User', UserSchema);