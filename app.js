const express = require("express");
const cors = require("cors");
const contactRouter = require("./routes/contacts");
const middleware = require("./utils/middleware");
require("./database/db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactRouter);

app.use(middleware.unknownEndPointHandler);
app.use(middleware.errorHandler);

module.exports = app;
