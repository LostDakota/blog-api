const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    displayName: String,
    name: String,
    password: String
}, {
    timestamp: true
});

module.exports = mongoose.model('User', UserSchema);