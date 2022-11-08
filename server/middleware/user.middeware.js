const User = require('../models/User.model');
const errMessages = require('../const/err-messages.const');
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

const userMiddleware = {
    isValidObjectId: (req, res, next) => {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).send({ERR: errMessages.INVALID_ID})
        }
        next();
    },

    checkDuplicateUsername: (req, res, next) => {
        User.findOne({
            username: req.body.username
        }, function(err, user){
            if (err) {
                res.status(500).send({ ERROR: err });
                return;
            }
            if (user) {
                res.status(400).send({ ERROR: errMessages.EXIST_USERNAME })
                return;
            }
            next();
        })
    }, 

    // CHECK DUPLICATE PHONE_NUMBER
    checkDuplicatePhoneNumber: (req, res, next) =>{
        User.findOne({
            phone_number: req.body.phone_number
        }).exec((err, phone_number) => {
            if (err) {
                res.status(500).send({ ERROR: err });
                return;
            }
            if (phone_number) {
                res.status(400).send({ ERROR: errMessages.EXIST_PHONE});
                return
            }
            next();
        })
    },

    // CHECK DUPLICATE EMAIL 
    checkDuplicateEmail: (req, res, next) => {
        //console.log('sdgs')
        User.findOne({
            phone: req.body.phone
        }).exec((err, email) => {
            if (err) {
                res.status(500).send({ ERROR: err });
                return;
            }
            if (email) {
                res.status(400).send({ ERROR: errMessage.EXIST_EMAIL});
                return
            }
            next();
        })
        }
}

module.exports = userMiddleware;