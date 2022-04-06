const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//REGISTER
router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_PASS_KEY).toString(),
  });
  try {
    const user = await newUser.save();
    const { password, ...others } = user._doc;
    res.status(201).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json('Wrong password or username!');

    const originalPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_PASS_KEY).toString(CryptoJS.enc.Utf8);
    originalPassword !== req.body.password && res.status(401).json('Wrong password or username!');
    const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_PASS_KEY, {
      expiresIn: '5d',
    });
    const { password, ...others } = user._doc;
    res.status(201).json({ ...others, accessToken });
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
