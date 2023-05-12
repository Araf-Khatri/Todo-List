const express = require("express");
const cors = require("cors");
const todoRouter = require("./Routes/todo-routes");
const app = express();


app.use(express.json());

app.use("*", cors());


app.use("/api/todo", todoRouter);

module.exports = app;
