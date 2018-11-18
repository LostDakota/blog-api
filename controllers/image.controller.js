const multer = require('multer');

let storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

let upload = multer({storage: storage});



module.exports = (app) => {
    app.post('/image', upload.single('image'), (req, res) => {
        res.send(req.file.originalname);
    });
}