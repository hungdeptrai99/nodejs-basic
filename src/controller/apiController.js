import pool from "../configs/connectDB";

let getAllUsers = async (req, res) => {
  const [rows, filed] = await pool.execute("select * from users");
  return res.status(200).json({
    message: "success",
    data: rows,
  });
};

let createNewUsers = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  if (!firstName || !lastName || !email || !address) {
    return res.status(200).json({
      message: "missing params",
    });
  }
  await pool.execute(
    `insert into users(firstName,lastName,email,address) values(?,?,?,?)`,
    [firstName, lastName, email, address]
  );
  return res.status(200).json({
    message: "success",
  });
};

let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  if (!firstName || !lastName || !email || !address || !id) {
    return res.status(200).json({
      message: "missing params",
    });
  }
  await pool.execute(
    "update users set firstName = ? , lastName=?,email=?,address=? where id = ?",
    [firstName, lastName, email, address, id]
  );
  return res.status(200).json({
    message: "success",
  });
};
const url = require("url");
let deleteUser = async (req, res) => {
    let userId = req.query.id;
    console.log(req.params)
    // if (!userId) {
    //   return res.status(200).json({
    //     message: "missing required params",
    //   });
    // }

    // let [dataUserId] = await pool.execute("select * from users where id=?", [
    //   userId,
    // ]);

    // if (dataUserId.length < 1) {
    //   return res.status(200).json({
    //     message: "data is not exsits",
    //   });
    // }

    // await pool.execute("delete from users where id = ?", [userId]);
    // return res.status(200).json({
    //   message: "success",
    // });
};
module.exports = {
  getAllUsers,
  createNewUsers,
  updateUser,
  deleteUser,
};
