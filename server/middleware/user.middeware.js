const User = require('../models/User.model');
const errMessages = require('../const/err-messages.const');
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

const userMiddlename = {
    isValidObjectId: (req, res, next) => {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).send({ERR: errMessages.INVALID_ID})
        }
        next();
    },

    checkDuplicateUsername: (req, res, next) => {
        User.findOne({
            username: req.body.username
        }).exac((err, user) => {
            if (err) {
                res.status(500).send({ ERROR: err });
                return;
            }
            if (user) {
                res.status(400).send({ ERROR: errMessages.EXIST_USERNAME})
                return;
            }
            next();
        })
    }, 

    checkDuplicatePhone(req, res, next) {
        //console.log('sdgs')
        User.findOne({
            phone: req.body.phone
        }).exec((err, phone) => {
            if (err) {
                res.status(500).send({ ERROR: err });
                return;
            }
            if (phone) {
                res.status(400).send({ ERROR: errMessage.EXIST_PHONE});
                return
            }
            next();
        })
    },

    checkDuplicateEmail(req, res, next) {
        //console.log('sdgs')
        User.findOne({
            phone: req.body.phone
        }).exec((err, email) => {
            if (err) {
                res.status(500).send({ ERROR: err });
                return;
            }
            if (phone) {
                res.status(400).send({ ERROR: errMessage.EXIST_EMAIL});
                return
            }
            next();
        })
        }
}
