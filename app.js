// untuk file utils
// panggil perantara

const express = require("express");
// panggil fungsi konek ke database
require("./mongo/db");
const expressLayouts = require("express-ejs-layouts");
const Data = require("./utils/settings");
const app = express();
const port = 3000;

// set ke layout
app.set("view engine", "ejs");
// set staticnya
app.use(express.static("public"));

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

app.get('/tables/add/', (req, res) => {
  
})

// setting port listeningnya
app.listen(port, () => {
  console.log("App is listening on port: " + port);
});
