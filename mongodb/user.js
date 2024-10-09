// untuk validasi user

const mongoose = require("mongoose");

const userFipoxygen = mongoose.model("user", {
  email: {
    type: String,
    required: true,
  },
  username: {
    typr: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = userFipoxygen;
