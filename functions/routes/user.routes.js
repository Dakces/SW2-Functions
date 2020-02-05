const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");

//SignUpUser
router.post("/signup", user.signUp);

//Get all Users
// router.get("/", user.getAllUsers);

//Get user by Id
// router.get("/:id", user.getOneUser);

module.exports = router;
