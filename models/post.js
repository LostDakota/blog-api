const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: String,
    content: String,
    tags: [String],
    createdBy: String,
    slug: String,
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);