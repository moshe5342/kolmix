const mongoose = require('mongoose');
const Joi = require('joi');

const contactFormSchema = new mongoose.Schema({
    fullname: String,
    tel: String,
    email: String,
    subject: String,
});

exports.ContactFormModel = mongoose.model('contactForm', contactFormSchema);


exports.validContactForm = (_bodyData) => {
    let joiSchema = Joi.object({
        fullname: Joi.string().required(),
        tel: Joi.string().required(),
        email: Joi.string().allow(null,''),
        subject: Joi.string().allow(null,''),
    });

    return joiSchema.validate(_bodyData);
}