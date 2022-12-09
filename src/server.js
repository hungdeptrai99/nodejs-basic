// const express = require("express");
import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web";
import initApiRoute from "./route/api";
import accountRouter from "./route/account";
import loginJWT from "./route/loginJWT";
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

app.use("/api/account/", accountRouter);
app.use("/", loginJWT);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
