const express = require('express');
const path = require("path");
const authRouter = require('./authRouter');
const usersRouter = require("./usersRouter");

const router = express();

router.use('/auth', authRouter);
router.use('/users', usersRouter)

router.use(express.static(path.join(__dirname, 'front', 'build')));

router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'));
});

module.exports = router;
