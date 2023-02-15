const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { config } = require('../config/secret')

const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    newsletterConfirm: Boolean,
    date_created: {
        type: Date, default: Date.now()
    },
    role: {
        type: String, default: 'user'
    },
});

exports.UserModel = mongoose.model('users', userSchema);;

exports.genToken = (_userId, role) => {
    let token = jwt.sign({ _id: _userId, role }, config.tokenSecret, { expiresIn: '30days' });
    return token;
}

exports.validUser = (_bodyData) => {
    let joiSchema = Joi.object({
        fullname: Joi.string().min(1).max(30).required(),
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(0).max(500).required(),
        newsletterConfirm: Joi.boolean().required(),
    });

    return joiSchema.validate(_bodyData);
}

exports.validLogin = (_bodyData) => {
    let joiSchema = Joi.object({
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(0).max(500).required()
    });

    return joiSchema.validate(_bodyData);
}