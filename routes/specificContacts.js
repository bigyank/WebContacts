const express = require("express");
const router = express.Router();
const Contact = require("../models/contacts");

// get all contacts for a specific person

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const person = await Contact.findById(id);
  res.status(200).send(person);
});

// edit existing data

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const updatedPerson = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });
  res.status(200).send(updatedPerson);
});

// delete specific person

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Contact.findByIdAndDelete(id);
  res.status(204).end();
});

// add additional urls

router.post("/:id/url", async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const person = await Contact.findById(id);
  person.contacts = [...person.contacts, body];
  const savedPerson = await person.save();

  res.status(201).send(savedPerson);
});

// delete specific url

router.delete("/:id/url/:urlID", async (req, res) => {
  const { id } = req.params;
  const { urlID } = req.params;
  const person = await Contact.findById(id);

  person.contacts = person.contacts.filter((urls) => urls.id !== urlID);
  await person.save();
  res.status(204).end();
});

module.exports = router;
