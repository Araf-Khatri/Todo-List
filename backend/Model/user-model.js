const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "User must have a username"],
    trim: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: [true, "Password must have atleast 6 characters"],
  },
  passwordConfirm: {
    type: String,
    require: [true, "please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Password are not the same!",
    },
  },
});

// UserSchema.pre(/^find/, async function (next) {
//   this.select("-password -__v");
// });

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

UserSchema.methods.correctPassword = async (currPassword, userPassword) => {
  return await bcrypt.compare(currPassword, userPassword);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
