const express = require("express");

require("express-async-errors");
require("./database/db");

const Celebrate = require("celebrate");
const cors = require("cors");
const contactRouter = require("./routes/contacts");
const specificContactRouter = require("./routes/specificContacts");
const middleware = require("./utils/middleware");

const app = express();

app.use(express.static("react-ui/build"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactRouter);
app.use("/api/contacts", specificContactRouter);

app.use(middleware.unknownEndPointHandler);
app.use(Celebrate.errors());
app.use(middleware.errorHandler);
module.exports = app;
