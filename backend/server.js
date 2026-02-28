const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const database = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(database).then(() => {
  console.log("DB connection successful!");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("app running on port " + port);
});
