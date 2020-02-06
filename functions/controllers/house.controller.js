const { db } = require("../db/admin");

exports.getAllHouses = (req, res) => {
  db.collection("houses")
    .get()
    .then(data => {
      let houses = [];
      data.forEach(doc => {
        houses.push({
          houseId: doc.id,
          alias: doc.data().alias,
          address: doc.data().address,
          ownerNickname: doc.data().ownerNickname,
          createdAt: doc.data().createdAt,
          roomCount: doc.data().roomCount,
          houseImage: doc.data().houseImage
        });
      });
      return res.status(200).json({ status: "success", data: houses });
    })
    .catch(err =>
      res.status(500).send({
        message: "Something went wrong."
      })
    );
};

exports.getHouse = (req, res) => {
  let houseData = {};
  db.doc(`/houses/${req.params.houseId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "House not found" });
      }
      houseData = doc.data();
      houseData.houseId = doc.id;
      //
      return db
        .collection("rooms")
        .where("houseId", "==", req.params.houseId)
        .get();
    })
    .then(data => {
      houseData.rooms = [];
      data.forEach(doc => {
        let room = doc.data();
        room.roomId = doc.id;
        houseData.rooms.push(room);
      });
      return res.status(200).json({ status: "success", data: houseData });
    })
    .catch(err => {
      res.status(500).json({ error: err.code });
    });
};
