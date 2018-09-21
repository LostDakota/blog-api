const express  = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser({limit: '50mb'}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Successfully connected to the database.');
}).catch(err => {
    console.log(err);
    process.exit();
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, content-Type, Accept");
    next();
})

app.use(express.static('public'));

require('./routes/post.routes')(app);

app.listen(3001, () => {
    console.log("Listening on 3001");
});