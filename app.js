// untuk file utils
// panggil perantara

const express = require("express");
// panggil fungsi konek ke database
require("./mongo/db");
const expressLayouts = require("express-ejs-layouts");
const User = require("./mongodb/user");
const router = express.Router();
const { body, validationResult, check } = require("express-validator");
const Data = require("./mongodb/settings");
const { get } = require("mongoose");
const app = express();
const port = 3000;

// set ke layout
app.set("view engine", "ejs");
// set staticnya
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// untuk halaman login

router.post("/submitlogin", (req, res) => {
  const { email, password } = req.body;

  // cek duplikat apakah sudah ada datanya di database
});

app.get("/", (req, res) => {
  res.render("login");
});

// setting untuk getnya
app.get("/dashboard", (req, res) => {
  res.render("index");
});

app.get("/tables", async (req, res) => {
  // menampilkan kedalam table
  const getData = await Data.find();
  res.render("tables", {
    ambilData: getData,
  });
});

app.post("/submit", (req, res) => {
  const getData = req.body;
  Data.insertMany(getData)
    .then((results) => {
      res.redirect("/tables");
    })
    .catch((err) => {
      console.log("Error Detected");
    });
});

// debugging validator

// app.post(
//   "/submitlogin",
//   [check("email", "gunakan format email yang benar").isEmail()],
//   (req, res) => {
//     const error = validationResult(req);
//     if (!error.isEmpty()) {
//       res.render("login", {
//         error: error.array(),
//       });
//     } else {
//       res.redirect("/dashboard");
//     }
//   }
// );

app.get("/addform", (req, res) => {
  res.render("add");
});

// setting port listeningnya
app.listen(port, () => {
  console.log("App is listening on port: " + port);
});
