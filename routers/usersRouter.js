const usersRouter = require('express')();
const UserModel = require('../models/User');

usersRouter.get('/:username', async (req, res) => {
  try {
    const user = await UserModel.findOne({username: req.params.username});
    if (!user) {
      return res.status(404).end();
    }

    return res.status(200).json(
      {
        username: user.username,
        messagesSent: user.messagesSent,
        registrationDate: user.registrationDate,
      });
  } catch (e) {
    res.status(500).end();
  }
});

module.exports = usersRouter;
