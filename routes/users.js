const express = require('express');
const bcrypt = require('bcrypt');
const { UserModel, validUser, validLogin, genToken } = require('../models/userModel');
const { authToken } = require('../auth/authToken');
const router = express.Router();

router.get('/', async (req, res) => {
    let data = await UserModel.find({})
    res.json(data);
});

router.get('/userInfo', authToken, async (req, res) => {
    // נבדוק אם בכלל נשלח טוקן
    let user = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0 })
    res.json(user);
});

router.post('/', async (req, res) => {
    let validBody = validUser(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let user = new UserModel(req.body);
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        user.password = '*****'
        res.status(201).json(user);
    }
    catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({ msg: 'Email already in system try login', code: 11000 });
        }
        console.log(err);
        res.status(500).json({ msg: 'err', err });
    }
});

router.post('/login', async (req, res) => {
    let validBody = validLogin(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    // נבדוק אם המייל קיים במסד נתונים
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).json({ msg: 'User not found' });
    }
    // נבדוק אם הסיסמה תואמת לסיסמה המוצפנת שבמסד נתונים
    let passwordValid = await bcrypt.compare(req.body.password, user.password);
    if (!passwordValid) {
        return res.status(401).json({ msg: 'Password wrong' });
    }
    // נחזיר הודעה שהכל בסדר ונייצר טוקן
    let newToken = genToken(user._id, user.role);
    res.json({ token: newToken });
});

module.exports = router;