const mongoose = require('mongoose');
const Joi = require('joi');

const playbackSchema = new mongoose.Schema({
    id: Number,
    category: String,
    name: String,
    price: Number,
    image: String,
});

exports.PlaybackModel = mongoose.model('playbacks', playbackSchema);


exports.validPlayback = (_bodyData) => {
    let joiSchema = Joi.object({
        id: Joi.number().min(0).required(),
        category: Joi.string().min(3).max(15).required(),
        name: Joi.string().min(3).max(50).required(),
        price: Joi.number().min(0).max(500).required(),
        image: Joi.string().min(5).max(99).required(),
    });

    return joiSchema.validate(_bodyData);
}