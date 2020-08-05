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
    required: true,
    trim: true,
  },
});

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  contacts: [sitesSchema],
});

// throw error for unique items
contactSchema.plugin(uniqueValidator);

const cleanDatabaseFields = (schemaName) => {
  /*
   * replaces _id with id (done by enabling virtuals)
   * converts _id as string from objectID
   * deletes __v before sending
   */
  schemaName.set("toJSON", {
    virtuals: true,
    transform: (_document, returnedObject) => {
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });
};

cleanDatabaseFields(contactSchema);
cleanDatabaseFields(sitesSchema);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
