const Post = require('../models/post');
const scraper = require('./scraper.controller');

exports.create = (req, res) => {
    if(!req.body.content){
        return res.status(400).send({
            message: 'Post content cannot be empty!'
        });
    }

    const post = new Post({
        title: req.body.title || "Untitled Entry",
        content: req.body.content,
        tags: req.body.tags,
        slug: req.body.title.toLowerCase().replace(/[^\w\s]/gi, '').split(' ').join('-'),
        description: req.body.description
    });

    post.save()
        .then(data => {
            scraper.sitemap();
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                error: err.message || 'Something went wrong.'
            });
        });  
}

exports.findAll = (req, res) => {
    Post.find()
    .sort({'createdAt': -1})
    .then(posts => {
        res.send(posts);
    }).catch(err => { 
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving posts."
        });
    });
}

exports.findOne = (req, res) => {
    Post.findOne({slug: req.params.slug})
        .then(post => {
            if(!post) {
                return res.status(404).send({
                    message: "Post not found with id " + req.params.postId
                });            
            }
            res.send(post);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Post not found with id " + req.params.postId
                });                
            }
            return res.status(500).send({
                message: "Error retrieving post with id " + req.params.postId
            });
        });
}

exports.latest = (req, res) => {
    Post.find({}, {}, { sort: {'createdAt': -1} }).limit(req.params.count || 3)
        .then(post => {
            if(!post) return res.status(404).send('Not found');
            return res.status(200).json(post);
        });
}

exports.update = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Post content can not be empty"
        });
    }

    Post.findOneAndUpdate({slug: req.params.slug}, {
        title: req.body.title || "Untitled Post",
        content: req.body.content,
        tags: req.body.tags,
        slug: req.body.title.toLowerCase().replace(/[^\w\s]/gi, '').split(' ').join('-'),
        description: req.body.description
    }, {new: true})
    .then(post => {
        if(!post) {
            return res.status(404).send({
                message: "Post not found with slug " + req.params.slug
            });
        }
        res.send(post);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Post not found with slug " + req.params.slug
            });                
        }
        return res.status(500).send({
            message: "Error updating post with slug " + req.params.slug
        });
    });
}

exports.delete = (req, res) => {
    Post.findOneAndRemove({ slug: req.params.slug })
    .then(post => {
        if(!post) {
            return res.status(404).send({
                message: "Post not found with slug " + req.params.slug
            });
        }
        scraper.sitemap();
        res.send({message: "Post deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Post not found with slug " + req.params.slug
            });                
        }
        return res.status(500).send({
            message: "Could not delete post with slug " + req.params.slug
        });
    });
}

exports.tags = (req, res) => {
    console.log(req.params.tag);
    Post.find({ tags: req.params.tag })
        .then(posts => {
            if(posts){
                return res.json(posts);
            } else {
                return res.status(200);
            }
        });
}