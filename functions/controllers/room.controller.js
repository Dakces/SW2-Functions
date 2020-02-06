const { db } = require("../db/admin");

exports.getRoom = (req, res) => {
  let roomData = {};
  db.doc(`/rooms/${req.params.roomId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Room not found" });
      }
      roomData = doc.data();
      roomData.roomId = doc.id;
      //return res.status(200).json({ status: "success", data: roomData });
      return db
        .collection("sensors")
        .where("roomId", "==", req.params.roomId)
        .get();
    })
    .then(data => {
      roomData.sensors = [];
      data.forEach(doc => {
        let sensor = doc.data();
        sensor.sensorId = doc.id;
        roomData.sensors.push(sensor);
      });
      return res.status(200).json({ status: "success", data: roomData });
    })
    .catch(err => {
      res.status(500).json({ error: err.code });
    });
};
