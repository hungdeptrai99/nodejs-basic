import AccountModel from "../configs/connectDBMongo";
import jwt from "jsonwebtoken";
import express from "express";
var router = express.Router();
// Mongodb register
router.post("/register", (req, res) => {
  var { username, password } = req.body;

  AccountModel.findOne({
    username: username,
  })
    .then((data) => {
      if (data) {
        res.json("user da ton tai");
      } else {
        return AccountModel.create({
          username: username,
          password: password,
        });
      }
    })
    .then((data) => {
      res.status(200).json("success");
    })
    .catch((err) => {
      res.status(500).json("tao tai khoan that bai");
    });
});

// Login with JWT
router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  const data = await AccountModel.findOne({
    username: username,
    password: password,
  });
  try {
    if (data) {
      let token = jwt.sign({ _id: data._id }, "keysecret");
      return res.json({
        message: "Login success",
        token,
      });
    } else {
      res.status(400).json("Tai khoan khong ton tai");
    }
  } catch (error) {}
});

// CheckTokenJWTLogin

router.get(
  "/private",
  (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const result = jwt.verify(token.slice(7), "keysecret");
      const id = result._id;
      AccountModel.findById(id).then((data) => {
        res.data = data;
        next();
      });
    } catch (error) {
      res.json("you need login");
    }
  },
  (req, res, next) => {
    const { username, password } = res.data;
    res.json({ username, password });
  }
);

module.exports = router;
