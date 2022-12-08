// const express = require("express");
import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web";
import initApiRoute from "./route/api";
import AccountModel from "./configs/connectDBMongo";
import accountRouter from "./route/account";
require("dotenv").config();
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;

// su dung cho form action
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup view engine
configViewEngine(app);

// init web route
initWebRoute(app);
initApiRoute(app);

// Mongodb register
app.post("/register", (req, res) => {
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

app.post("/login", (req, res) => {
  let { username, password } = req.body;
  AccountModel.findOne({
    username: username,
    password: password,
  })
    .then((data) => {
      if (data) {
        res.json("dang nhap success");
      } else {
        res.status(400).json("Tai khoan khong ton tai");
      }
    })
    .catch((err) => {
      res.status(500).json("Loi 500 dang nhap that bai");
    });
});

app.use("/api/account/", accountRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
