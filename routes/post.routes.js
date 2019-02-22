module.exports = (app) => {
    const posts = require('../controllers/post.controller');
    const user = require('../controllers/user.controller');
    const scraper = require('../controllers/scraper.controller');

    // unprotected
    app.get('/posts', posts.findAll);
    app.get('/post/:slug', posts.findOne);
    app.get('/tags/:tag', posts.tags);
    app.get('/latest/:count', posts.latest);

    // protected
    app.post('/post', posts.create);
    app.put('/post/:slug', posts.update);
    app.post('/post/:slug', posts.delete);    

    app.post('/login', user.authenticate);

    app.get('/sitemap', (req, res) => {
        scraper.sitemap();
        res.status(200).json('ok');
    });

    app.get('/static', (req, res) => {
        scraper.static();
        res.status(200).send('ok');
    });
}