// untuk file utils
// panggil perantara

const express = require("express");
// panggil fungsi konek ke database
require("./mongo/db");
const expressLayouts = require("express-ejs-layouts");
const User = require("./mongodb/user");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { body, validationResult, check } = require("express-validator");
const Data = require("./mongodb/settings");
const { get } = require("mongoose");
const bcrypt = require("bcryptjs/dist/bcrypt");
const app = express();
const port = 3000;

// set ke layout
app.set("view engine", "ejs");
// set staticnya
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// halaman registrasi akun

app.post("/submitregister", async (req, res) => {
  const { email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  // register user ke dalam database

  const newUser = new User({
    email,
    username,
    password: hashedPassword,
  });
  // data berhasil di masukkan ke dalam database
  try {
    newUser.save();
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

// halaman login user dengan t
app.post("/submitlogin", async (req, res) => {
  const { email, password } = req.body;
  const findAuthUser = await User.findOne({ email });

  if (!findAuthUser) {
    res.redirect("/");
    return console.log("Username not found");
  }
  // ubah hashed dan bandingkan apakah sama
  const validPassword = await bcrypt.compare(password, findAuthUser.password);
  if (!validPassword) {
    res.redirect("/");
    return console.log("Wrong Password inserted");
  }
  const token = jwt.sign({ email: findAuthUser.email }, "secretKey", {
    expiresIn: "1h",
  });

  res.setHeader("Authorization", token);

  return res.redirect("/dashboard");
});

app.get("/", (req, res) => {
  res.render("login");
});

// setting untuk getnya
app.get("/dashboard", verifyUser, (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
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

// buat function untuk validasi tiap token halaman

function verifyUser(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send("Token not found");
  }

  jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) {
      return res.status(403).send("Please Login first");
    }
    req.findAuthUser = decoded;
    next();
  });
}

app.get("/addform", (req, res) => {
  res.render("add");
});

// setting port listeningnya
app.listen(port, () => {
  console.log("App is listening on port: " + port);
});
