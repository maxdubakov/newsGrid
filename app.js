const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const MONGODB_URI = `mongodb+srv://maxim:Dubakov88@onlineshop-nephe.mongodb.net/newsGrid`;

const feedRoutes = require("./routes/feed");
const suggestRoutes = require("./routes/suggest");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "images")));


app.use(feedRoutes);
app.use(suggestRoutes);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
