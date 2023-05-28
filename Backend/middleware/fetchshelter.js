// middle ware to verify shelter
const { request } = require('express');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'petify';

const fetchshelter = (req, res, next) => {

    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: 'Please Authenticate using a valid token' });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.shelter = data.shelter;
        next();
    }
    catch (error) {
        res.status(401).send({ error: 'Please Authenticate using a valid token' });
    }

};

module.exports = fetchshelter;
