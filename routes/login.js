const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { celebrate, Segments } = require("celebrate");
const createError = require("http-errors");

const User = require("../models/user");
const validator = require("../utils/validator");
const { JWT_SECRET } = require("../utils/config");

router.post(
  "/",
  celebrate({
    [Segments.BODY]: validator.authValidator,
  }),
  async (req, res) => {
    const credentials = req.body;
    const user = await User.findOne({ username: credentials.username });

    // validate user and password
    const validUser =
      user == null
        ? false
        : await bcrypt.compare(credentials.password, user.password);

    if (!validUser) {
      throw createError(400, "Username or Password is Incorrect");
    }

    // create JWT
    const JWT = jwt.sign({ userID: user.id }, JWT_SECRET);
    const userToSend = { token: JWT, username: user.username };
    res.status(201).send(userToSend);
  }
);

module.exports = router;
