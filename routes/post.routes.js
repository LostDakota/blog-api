module.exports = (app) => {
    const posts = require('../controllers/post.controller');
    const user = require('../controllers/user.controller');
    const sitemap = require('../controllers/scraper.controller');

    // unprotected
    app.get('/posts', posts.findAll);
    app.get('/post/:postId', posts.findOne);
    app.get('/tags/:tag', posts.tags);

    // protected
    app.post('/post', posts.create);
    app.put('/post/:postId', posts.update);
    app.post('/post/:postId', posts.delete);    

    app.post('/login', user.authenticate);

    app.get('/sitemap', (req, res) => {
        sitemap();
        res.status(200).json('ok');
    });
}