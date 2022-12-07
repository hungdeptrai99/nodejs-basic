import { json } from "body-parser";
import pool from "../configs/connectDB";

let getHomePage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM `users`");
  return res.render("index.ejs", { dataUser: rows, test: "abc" });
};

let getDetailPage = async (req, res) => {
  let id = req.params.userId;
  let [user] = await pool.execute(`select * from users where id = ?`, [id]);
  return res.send(JSON.stringify(user));
};

let createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    `insert into users(firstName,lastName,email,address) values(?,?,?,?)`,
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};
let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute(`delete from users where id=?`, [userId]);
  return res.redirect("/");
};
let getEditPage = async (req, res) => {
  let id = req.params.userId;
  let [user] = await pool.execute(`select * from users where id = ?`, [id]);
  // await pool.execute(`update users set firstName`)
  return res.render("update.ejs", { dataUser: user[0] });
};
let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  await pool.execute(
    "update users set firstName = ? , lastName=?,email=?,address=? where id = ?",
    [firstName, lastName, email, address, id]
  );
  return res.redirect("/");
};

// UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition;
module.exports = {
  getHomePage,
  getDetailPage,
  createNewUser,
  deleteUser,
  getEditPage,
  updateUser,
};
