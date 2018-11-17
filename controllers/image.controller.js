exports.upload = (req, res) => {
    if(req.files){
        res.send('files are present');
    } else {
        res.status(500).send('file needed');
    }
}