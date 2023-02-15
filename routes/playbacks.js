const express = require('express');
const { PlaybackModel, validPlayback } = require('../models/playbackModel');
const router = express.Router();

router.get('/', async (req, res) => {
    let data = await PlaybackModel.find({})
    res.json(data);
});

router.post('/', async (req, res) => {
    let validBody = validPlayback(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let playback = new PlaybackModel(req.body);
        await playback.save();
        res.status(201).json(playback);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ err: 'Id already in system or there another problem' })
    }

});

router.delete('/:idDel', async (req, res) => {
    try {
        let data = await PlaybackModel.deleteOne({ _id: req.params.idDel });
        // if succees we will receive  '"acknowledged": true' andmore details..
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.put('/:idEdit', async (req, res) => {
    let validBody = validPlayback(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let data = await PlaybackModel.updateOne({ _id: req.params.idEdit }, req.body);
        // if succees we will receive  '"acknowledged": true' andmore details..
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

module.exports = router;