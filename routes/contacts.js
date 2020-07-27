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

// add additional social media links
router.post("/:id/url", async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const person = await Contact.findById(id);
    person.contacts = [...person.contacts, body];
    const savedPerson = await person.save();

    res.status(201).send(savedPerson);
  } catch (error) {
    next(error);
  }
});

// edit existing data

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const updatedPerson = await Contact.findByIdAndUpdate(id, body, {
      new: true,
    });
    res.status(200).send(updatedPerson);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
