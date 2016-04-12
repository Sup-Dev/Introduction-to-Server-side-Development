var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Promos = require('../models/promotions');
var Verify = require('./verify');

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Promos.find({}, function (err, promo) {
        if (err) throw err;
        res.json(promo);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Promos.create(req.body, function (err, promo) {
        if (err) throw err;
        console.log('Promo created!');
        var id = promo._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the leader with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Promos.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

promoRouter.route('/:Id')
.get(function (req, res, next) {
    Promos.findById(req.params.Id, function (err, promo) {
        if (err) throw err;
        res.json(promo);
    });
})

.put(function (req, res, next) {
    Promos.findByIdAndUpdate(req.params.Id, {
        $set: req.body
    }, {
        new: true
    }, function (err, promo) {
        if (err) throw err;
        res.json(promo);
    });
})

.delete(function (req, res, next) {
    Promos.findByIdAndRemove(req.params.Id, function (err, resp) {        
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = promoRouter;
