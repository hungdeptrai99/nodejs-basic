var jwt = require("jsonwebtoken");

// var token = jwt.sign({ username: "trangiahung" }, "giahung", { expiresIn: 10 });
// console.log(token);


let tokenOld = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRyYW5naWFodW5nIiwiaWF0IjoxNjcwNTU3MDc3LCJleHAiOjE2NzA1NTcwODd9.sOV2UgC2w4M-vHjZt2XM0lZHiWY5X-uBFD8GD_w_1ic'
let result = jwt.verify(tokenOld, "giahung");
console.log(result);
