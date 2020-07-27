const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const sitesSchema = new Schema({
  url: {
    required: true,
    trim: true,
    type: String,
  },
  site: {
    type: String,
    default: "Site",
  },
});

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  contacts: [sitesSchema],
});

// throw error for unique items
contactSchema.plugin(uniqueValidator);

// remove _id in contactSchema and replace it with id
// make the id of type String instead of Objectid

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

sitesSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
