const router = require("express").Router();
const { celebrate, Segments } = require("celebrate");
const Contact = require("../models/contacts");
const User = require("../models/user");
const validator = require("../utils/validator");

router.get("/", async (req, res) => {
  const allContacts = await User.findById(req.user.id).populate("records", {
    user: 0,
  });
  res.status(200).send(allContacts);
});

// add the person for the first time
router.post(
  "/",
  celebrate({ [Segments.BODY]: validator.addPersonValidator }),
  async (req, res) => {
    const { body } = req;
    const { user } = req;

    const newContact = new Contact({ ...body, user: user.id });
    user.records = user.records.concat(newContact.id);
    await user.save();

    const savedContact = await (await newContact.save())
      .populate("user", { records: 0 })
      .execPopulate();

    return res.status(201).send(savedContact);
  }
);

module.exports = router;
