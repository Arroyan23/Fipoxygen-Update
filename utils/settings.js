// untuk membuat data ke dalam schema

const mongoose = require("mongoose");

const Data = mongoose.model("Data", {
  location: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  temp: {
    type: String,
    required: true,
  },
  overall: {
    type: String,
    required: true,
  },
});

// export ke module
module.exports = Data;