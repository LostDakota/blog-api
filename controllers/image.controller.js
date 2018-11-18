const multer = require('multer');
const upload = multer({dest: 'uploads'});

module.exports = (app) => {
    app.post('/image', upload.single('image'), (req, res) => {
        res.send('ok');
    });
}