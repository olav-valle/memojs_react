let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let cardSchema = require('../models/CardSchema');

router
    .route('/create-card')
    .post((req, res, next) => {
        cardSchema
            .create(req.body, (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    console.log('Data: ' + data);
                    res.json(data);
                }
            })
    });

router
    .route('/')
    .get((
        req,
        res,
        next) => {
        cardSchema
            .find((error, data) => {
                    if (error) {
                        return next(error)
                    } else {
                        res.json(data)
                    }
                }
            )
    })

module.exports = router;