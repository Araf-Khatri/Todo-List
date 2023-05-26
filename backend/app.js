const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')

const todoRouter = require("./Routes/todo-routes");
const userRouter = require("./Routes/user-routes");
const app = express();

app.use(cookieParser())
app.use(express.json());

app.use("*", cors({
  origin: "https://todo-list-araf.netlify.app"
}));


app.use("/api/todo", todoRouter);
app.use("/api/user", userRouter);

module.exports = app;
