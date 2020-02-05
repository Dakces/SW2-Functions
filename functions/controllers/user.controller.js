const admin = require("firebase-admin");
const firebase = require("firebase");
const db = admin.firestore();

exports.signUp = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    nickname: req.body.nickname,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  };

  db.doc(`/users/${newUser.nickname}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({
          status: "failure",
          data: { nickname: "Este nickname ya se encuentra en uso" }
        });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => data.user.getIdToken())
    .then(sToken =>
      res.status(201).json({ status: "success", data: { token: sToken } })
    )
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: JSON.stringify(err) });
    });
};

// exports.getAllUsers = (req, res) => {
//   db.collection("users")
//     .get()
//     .then(data => {
//       let users = [];
//       data.forEach(doc => {
//         users.push(doc.data());
//       });
//       return res.status(200).json({ status: "success", data: users });
//     })
//     .catch(err =>
//       res.status(500).send({
//         message: "Something went wrong."
//       })
//     );
// };

// exports.getOneUser = (req, res) => {
//   const userId = req.param("id");
//   admin
//     .firestore()
//     .collection("users")
//     .where("id", "==", userId)
//     .get()
//     .then(data => {
//       if (data.empty) {
//         return res
//           .status(404)
//           .json({ status: "failure", data: { error: "User not found" } });
//       }

//       data.forEach(doc => {
//         return res.status(200).json({ status: "success", data: doc.data() });
//       });
//     })
//     .catch(err =>
//       res.status(500).send({
//         message: "Something went wrong."
//       })
//     );
// };
