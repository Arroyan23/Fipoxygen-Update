// untuk file utils
// panggil perantara

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
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

// setting port listeningnya
app.listen(port, () => {
  console.log("App is listening on port: " + port);
});
