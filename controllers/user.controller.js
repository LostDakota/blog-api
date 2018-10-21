let jwt = require('jsonwebtoken');

const Secret = require('../config/auth.config');
const User = require('../models/user');

exports.create = (req, res) => {
    const user = new User({
        displayName: req.body.displayName,
        name: req.body.name,
        password: req.body.password
    });

    user.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                error: err.message
            });
        });
}

exports.authenticate = (req, res) => {
    User.findOne({
        name: req.body.username,
        password: req.body.password
    }).then(user => {
        let token = jwt.sign({name: user.name}, Secret.secret, {expiresIn: 60});
        res.json({
            success: true,
            message: 'Successfully authenticated',
            token: token
        })
    }).catch(err => {
        res.status(500).send({error: err.message});
    });
}

exports.validated = (req) => {    
    return new Promise((resolve, reject) => {
        var token = req.headers['x-access-token'];
        if(!token) reject({message: 'no token present'});
        
        jwt.verify(token, Secret.secret, (err, decoded) => {
            if(err) reject(err);
            resolve(decoded);
        })
    });
}