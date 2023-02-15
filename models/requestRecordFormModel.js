const mongoose = require('mongoose');
const Joi = require('joi');

const requestRecordFormSchema = new mongoose.Schema({
    fullname: String,
    tel: String,
    email: String,
    subject: String,
    date: Date,
    time: String,
});

exports.RequestRecordFormModel = mongoose.model('requestRecordForm', requestRecordFormSchema);


exports.validRequestRecordForm = (_bodyData) => {
    let joiSchema = Joi.object({
        fullname: Joi.string().required(),
        tel: Joi.string().required(),
        email: Joi.string().allow(null,''),
        subject: Joi.string().allow(null,''),
        date: Joi.date().allow(null,''),
        time: Joi.string().allow(null,''),
    });

    return joiSchema.validate(_bodyData);
}