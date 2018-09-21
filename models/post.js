const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: String,
    content: String,
    tags: Object,
    createdBy: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);