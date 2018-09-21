module.exports = (app) => {
    const posts = require('../controllers/post.controller');
    const user = require('../controllers/user.controller');

    // unprotected
    app.get('/posts', posts.findAll);
    app.get('/post/:postId', posts.findOne);

    // protected
    app.post('/post', posts.create);
    app.put('/post/:postId', posts.update);
    app.post('/post/:postId', posts.delete);    

    app.post('/login', user.authenticate);
}