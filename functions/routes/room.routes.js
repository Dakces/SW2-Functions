const express = require("express");
const router = express.Router();
const room = require("../controllers/room.controller");

router.get("/:roomId", room.getRoom);

module.exports = router;
