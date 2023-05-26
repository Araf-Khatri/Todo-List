const jwt = require("jsonwebtoken");

const User = require("./../Model/user-model");

const resError = function (code) {
  if (code === 11000) {
    return "Username already Exists";
  }
};

const createToken = function (res, data) {
  const token = jwt.sign(data, process.env.SK_KEY, {
    expiresIn: "10d",
  });

  res.cookie("jwt", token);
  return token;
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!(username === "admin.ak") || !(password === "@raf11@dmin")) {
      throw new Error("You are not allowed to access this API");
    }
    const users = await User.find();
    res.status(200).json({
      status: "success",
      length: users.length,
      data: users,
    });
  } catch (err) {
    res.status(401).json({
      status: "failed",
    });
  }
};

exports.signup = async (req, res, next) => {
  try {
    const { username, password, passwordConfirm } = req.body;

    if (!username || !password || !passwordConfirm)
      throw new Error("Invalid field");

    const user = await User.create({
      username,
      password,
      passwordConfirm,
    });
    const token = createToken(res, {
      userId: user.id,
      username: user.username,
    });

    // user.password = undefined;
    res.status(201).json({
      status: "success",
      username: user.username,
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: resError(err.code) || err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new Error("Add login credentials");
    }

    const user = await User.findOne({ username }).select("+password");
    if (!user) throw new Error("No User found with that username");

    const isCorrectPassword = await user.correctPassword(
      password,
      user.password
    ); // (inputPassword, encrytedpassword)

    if (!isCorrectPassword) {
      throw new Error("Wrong Password");
    }

    const token = createToken(res, {
      userId: user.id,
      username: user.username,
    });

    res.status(200).json({
      status: "success",
      token,
      username: user.username,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
