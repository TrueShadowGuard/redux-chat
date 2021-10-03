const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./models/User');

const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config();

const router = require("./routers/router");
const startWsServer = require("./startWsServer");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(router);

(async () => {
  await mongoose.connect(process.env.MONGO);
  console.log('connected to mongo server');

  const httpServer = app.listen(PORT, () => console.log(`Server started at ${PORT}`));
  startWsServer(httpServer);
})()



