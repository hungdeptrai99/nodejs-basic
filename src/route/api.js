import express from "express";
import apiController from "../controller/apiController";

let router = express.Router();

const initWebRoute = (app) => {
  router.get("/users", apiController.getAllUsers);
  router.post("/create-user",apiController.createNewUsers)
  router.put("/update-user",apiController.updateUser)
  router.delete("/delete-user",apiController.deleteUser)
  return app.use("/api/v1/", router);
};

export default initWebRoute;
