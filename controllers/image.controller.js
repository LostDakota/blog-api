const multer = require('multer');
const upload = multer({dest: 'uploads'});

exports.upload = (upload.single('image'), (req, res) => {
    res.send('ok');
});