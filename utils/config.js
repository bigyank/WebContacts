require("dotenv").config();

const { DATABASE_URI } = process.env;
const { PORT } = process.env;
const { JWT_SECRET } = process.env;

module.exports = {
  DATABASE_URI,
  PORT,
  JWT_SECRET,
};
