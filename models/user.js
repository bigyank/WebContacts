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
userSchema.plugin(uniqueValidator);

const cleanDatabaseFields = (schemaName) => {
  /*
   * deletes password feild for security purpose
   * replaces _id with id
   * converts _id as string from objectID
   * deletes __v before sending
   */
  schemaName.set("toJSON", {
    virtuals: true,
    transform: (_document, returnedObject) => {
      delete returnedObject._id;
      delete returnedObject.__v;
      delete returnedObject.password;
    },
  });
};

cleanDatabaseFields(userSchema);

const User = mongoose.model("User", userSchema);
module.exports = User;
