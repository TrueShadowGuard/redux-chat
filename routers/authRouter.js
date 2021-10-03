const authRouter = require('express')();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret = process.env.JWT_SECRET;

authRouter.post('/register', async (req, res) => {
  console.log('register', req.body);
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) return res.status(400).end();
    const candidate = await User.findOne({username});
    if (candidate) return res.status(409).end();

    const user = new User({username, password});
    await user.save();

    const token = jwt.sign({username}, secret, {expiresIn: '24h'});
    return res.status(200).json({token: token});
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
});

authRouter.post('/login', async (req, res) => {
  console.log('login', req.body);
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) return res.status(400).end();
    const candidate = await User.findOne({username});

    if (!candidate) return res.status(400).end();
    if (candidate.password !== password) return res.status(400).end();

    const token = jwt.sign({username}, secret, {expiresIn: '24h'});

    return res.status(200).json({token});
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
});

module.exports = authRouter;
