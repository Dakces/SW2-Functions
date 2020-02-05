const admin = require("firebase-admin");

exports.getAllHouses = (req, res) => {
  admin
    .firestore()
    .collection("houses")
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
