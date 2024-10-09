// untuk membuat akun di database

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../mongodb/user");
const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");

// route untuk registrasi app user
// menambahkan fungsi login autentikasi
