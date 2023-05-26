const express = require("express");
const {
  signup,
  getAllUsers,
  login,
} = require("./../Controller/user-controller");

const router = express.Router();

// router.route("/admin").get(getAllUsers);
router.route("/signup").post(signup);
router.route("/login").post(login);

module.exports = router;
