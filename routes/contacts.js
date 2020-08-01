const router = require("express").Router();
const { celebrate, Segments } = require("celebrate");
const Contact = require("../models/contacts");
const validator = require("../utils/validator");

router.get("/", async (_req, res) => {
  const allContacts = await Contact.find({});
  res.status(200).send(allContacts);
});

// add the person for the first time
router.post(
  "/",
  celebrate({ [Segments.BODY]: validator.addPersonValidator }),
  async (req, res) => {
    const body = req.body;
    const newPerson = new Contact(body);
    const savedPerson = await newPerson.save();
    return res.status(201).send(savedPerson);
  }
);

module.exports = router;
