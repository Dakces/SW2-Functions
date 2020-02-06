const express = require("express");
const router = express.Router();
const house = require("../controllers/house.controller");

//Get all Houses
router.get("/", house.getAllHouses);
router.get("/:houseId", house.getHouse);

module.exports = router;
