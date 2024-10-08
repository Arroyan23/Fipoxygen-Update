const mongoose = require("mongoose");

// connect ke mongoose secara online
const uri =
  "mongodb+srv://oyeng:hirolucu123@cluster0.1mud1.mongodb.net/FipoxygenReports?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// debugging

// const Data = mongoose.model("Data", {
//   location: {
//     type: String,
//     required: true,
//   },
//   adress: {
//     type: String,
//     required: true,
//   },
//   condition: {
//     type: String,
//     required: true,
//   },
//   temp: {
//     type: String,
//     required: true,
//   },
//   overall: {
//     type: String,
//     required: true,
//   },
// });

// // tambahkan 1 data

// const data1 = new Data({
//   location: "jakarta",
//   adress: "Kemang Raya",
//   condition: "Normal",
//   temp: "28 deg",
//   overall: "Works Good",
// });

// data1.save().then(() => console.log("Berhasil Ditambah Ke Cluster"));
