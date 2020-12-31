const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const sm = require('./controllers/scraper.controller');

const app = express();

app.use(express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser({ limit: '50mb' }))

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

let store = {};

let cache = (req, res, next) => {
    const key = req.url;
    let value = store[key];
    if (value) {
        res.send(value)
    } else {
        res.sendResponse = res.send;
        res.send = data => {
            store[req.url] = data;
            res.sendResponse(data);
        }
        next();
    }
}

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => console.log('Successfully connected to the database.'))
  .catch(err => {
    console.log(err);
    process.exit();
});

app.use(compression({ threshold: 1 }));

app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, content-Type, Accept");
    next();
});

app.get('*', cache);

app.post('*', (req, res, next) => {
    cache = {};
    next();
});

app.put('*', (req, res, next) => {
    cache = {};
    next();
});

require('./routes/post.routes')(app);
require('./controllers/image.controller')(app);

const server = require('http').createServer(app);
server.listen(3001);

sm.sitemap();

module.exports = server;