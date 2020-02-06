const functions = require("firebase-functions");
//const admin = require("firebase-admin");
const firebase = require("firebase");
const express = require("express");
const app = express();
const firebaseConfig = require("./utils/firebaseConfig.json");

const cors = require("cors");
app.use(cors());

const { db } = require("./db/admin");

//Routes
const houseRoutes = require("./routes/house.routes");
//const userRoutes = require("./routes/user.routes");

//API Routes Definition
app.use("/houses", houseRoutes);
//app.use("/users", userRoutes);

exports.api = functions.https.onRequest(app);
