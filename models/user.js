const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  records: [
    {
      type: Schema.Types.ObjectId,
      ref: "Contact",
    },
  ],
});

// throw error for unique items
contactSchema.plugin(uniqueValidator);

const cleanDatabaseFields = (schemaName) => {
  /*
   * replaces _id with id
   * converts _id as string from objectID
   * deletes __v before sending
   */
  schemaName.set("toJSON", {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });
};

cleanDatabaseFields(userSchema);

const User = mongoose.model("User", userSchema);
module.exports = User;
