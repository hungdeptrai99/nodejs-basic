const express = require("express");
var router = express.Router();

const AccountModel = require("../configs/connectDBMongo");

router.get("/", (req, res, next) => {
  AccountModel.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json("loi server");
    });
});
const PAGE_SIZE = 5;
// Phan trang users
router.get("/users", (req, res, next) => {
  let { page, limit } = req.query;

  if (page) {
    page = parseInt(page);
    if(page < 1) {
        page = 1
    }
    var skip = (page - 1) * limit; // số lượng bỏ qua
    AccountModel.find({})
      .skip(skip)
      .limit(limit)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json("loi server");
      });
  } else {
    //Get All
    AccountModel.find({})
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json("loi server");
      });
  }
});

router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  AccountModel.findById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json("loi server");
    });
});

router.post("/", (req, res, next) => {
  let { username, password } = req.body;
  AccountModel.create({
    username: username,
    password: password,
  })
    .then((data) => {
      res.json("add success");
    })
    .catch((err) => {
      res.status(500).json("Loi server");
    });
});

router.put("/edit/:id", (req, res, next) => {
  let { newPassword } = req.body;
  let userId = req.params.id;
  AccountModel.findByIdAndUpdate(userId, {
    password: newPassword,
  })
    .then((data) => {
      res.status(200).json("update success");
    })
    .catch((err) => {
      res.status(500).json("Loi server");
    });
});

router.delete("/delete/:id", (req, res, next) => {
  let userId = req.params.id;
  AccountModel.deleteOne({
    _id: userId,
  })
    .then((data) => res.status(200).json("Delete success"))
    .catch((err) => {
      res.status(500).json("Loi server");
    });
});

module.exports = router;
