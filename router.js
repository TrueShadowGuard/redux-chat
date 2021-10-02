const express = require('express');
const path = require("path");
const authRouter = require('./authRouter');

const router = express();

router.use('/auth', authRouter)

router.use(express.static(path.join(__dirname, 'front', 'build')));

router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'));
});

module.exports = router;
