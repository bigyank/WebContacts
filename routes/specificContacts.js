const express = require("express");
const router = express.Router();
const { celebrate, Segments } = require("celebrate");
const createError = require("http-errors");

const Contact = require("../models/contacts");
const validator = require("../utils/validator");

// get all contacts for a specific person

router.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: validator.idValidator,
  }),
  async (req, res) => {
    const { user } = req;
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact || contact.user.toString() !== user.id) {
      throw new createError.NotFound();
    }

    res.status(200).send(contact);
  }
);

// delete specific person

router.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: validator.idValidator,
  }),
  async (req, res) => {
    const { user } = req;
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact || contact.user.toString() !== user.id) {
      throw new createError.NotFound();
    }

    await Contact.findByIdAndDelete(id);
    res.status(204).end();
  }
);

// add additional urls

router.post(
  "/:id/url",
  celebrate({
    [Segments.PARAMS]: validator.idValidator,
    [Segments.BODY]: validator.contactValidator,
  }),
  async (req, res) => {
    const { user } = req;
    const { id } = req.params;
    const body = req.body;

    const person = await Contact.findById(id);

    if (!person || person.user.toString() !== user.id) {
      throw new createError.NotFound();
    }

    person.contacts = [...person.contacts, body];
    const savedPerson = await person.save();

    res.status(201).send({
      id: savedPerson.id,
      contacts: savedPerson.contacts,
      name: savedPerson.name,
    });
  }
);

// patch a url

router.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: validator.idValidator,
  }),
  async (req, res) => {
    const { user } = req;
    const { id } = req.params;
    const { body } = req;

    const person = await Contact.findById(id);

    if (!person || person.user.toString() !== user.id) {
      throw new createError.NotFound();
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, body, {
      new: true,
    });

    res.status(202).send(updatedContact);
  }
);

// delete specific url

router.delete(
  "/:id/url/:urlID",
  celebrate({
    [Segments.PARAMS]: validator.idAndUrlIDValidator,
  }),
  async (req, res) => {
    const { user } = req;
    const { id } = req.params;
    const { urlID } = req.params;
    const person = await Contact.findById(id);

    if (!person || person.user.toString() !== user.id) {
      console.log("here");
      throw new createError.NotFound();
    }

    person.contacts = person.contacts.filter((urls) => urls.id !== urlID);
    await person.save();
    res.status(204).end();
  }
);

module.exports = router;
