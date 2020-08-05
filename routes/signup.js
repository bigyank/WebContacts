const express = require("express");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { celebrate, Segments } = require("celebrate");

const router = express.Router();

const User = require("../models/user");
const validator = require("../utils/validator");
const { JWT_SECRET } = require("../utils/config");

router.post(
  "/",
  celebrate({
    [Segments.BODY]: validator.authValidator,
  }),
  async (req, res) => {
    const userData = req.body;

    // hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(userData.password, saltRounds);

    // save user with hashed password
    const newUser = new User({ ...userData, password: passwordHash });
    const savedNewUser = await newUser.save();

    // create JWT
    const JWT = jwt.sign({ userID: savedNewUser.id }, JWT_SECRET);
    const userToSend = { token: JWT, username: savedNewUser.username };
    res.status(201).send(userToSend);
  }
);

module.exports = router;
