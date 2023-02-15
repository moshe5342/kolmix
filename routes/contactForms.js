const express = require('express');
const { ContactFormModel, validContactForm } = require('../models/contactFormModel');
const router = express.Router();

router.get('/', async (req, res) => {
    let data = await ContactFormModel.find({})
    res.json(data);
});

router.post('/', async (req, res) => {
    let validBody = validContactForm(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let contactForm = new ContactFormModel(req.body);
        await contactForm.save();
        res.status(201).json(contactForm);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ err: 'Contact details already in system or there another problem' })
    }

});

router.delete('/:idDel', async (req, res) => {
    try {
        let data = await ContactFormModel.deleteOne({ _id: req.params.idDel });
        // if succees we will receive  '"acknowledged": true' andmore details..
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.put('/:idEdit', async (req, res) => {
    let validBody = validContactForm(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let data = await ContactFormModel.updateOne({ _id: req.params.idEdit }, req.body);
        // if succees we will receive  '"acknowledged": true' andmore details..
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

module.exports = router;