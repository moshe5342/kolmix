const express = require('express');
const { RequestRecordFormModel, validRequestRecordForm } = require('../models/requestRecordFormModel');
const router = express.Router();

router.get('/', async (req, res) => {
    let data = await RequestRecordFormModel.find({})
    res.json(data);
});

router.post('/', async (req, res) => {
    let validBody = validRequestRecordForm(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let requestRecordForm = new RequestRecordFormModel(req.body);
        await requestRecordForm.save();
        res.status(201).json(requestRecordForm);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ err: 'Request record details already in system or there another problem' })
    }

});

router.delete('/:idDel', async (req, res) => {
    try {
        let data = await RequestRecordFormModel.deleteOne({ _id: req.params.idDel });
        // if succees we will receive  '"acknowledged": true' andmore details..
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.put('/:idEdit', async (req, res) => {
    let validBody = validRequestRecordForm(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let data = await RequestRecordFormModel.updateOne({ _id: req.params.idEdit }, req.body);
        // if succees we will receive  '"acknowledged": true' andmore details..
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

module.exports = router;