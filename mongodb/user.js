// untuk validasi user
require("../mongo/db");
const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// debugging berhasil

// const newUser = new User({
//   email: "syawqiarroyan@gmail.com",
//   username: "royan syawqi",
//   password: "hirolucu123",
// });

// newUser.save();
// console.log("Data berhasil di unggah ke cluster");

module.exports = User;
