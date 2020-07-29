const router = require("express").Router();
const Contact = require("../models/contacts");

router.get("/", async (_req, res) => {
  const allContacts = await Contact.find({});
  res.status(200).send(allContacts);
});

// add the person for the first time
router.post("/", async (req, res, next) => {
  const body = req.body;

  try {
    const newContact = new Contact(body);
    const savedContact = await newContact.save();
    return res.status(201).send(savedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
