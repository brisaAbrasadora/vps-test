const mongoose = require("mongoose");
const express = require("express");
const nunjucks = require("nunjucks");
const methodOverride = require("method-override");
const multer = require("multer");

const Author = require("./routes/author");
const Book = require("./routes/book");

mongoose.connect("mongodb://localhost:27017/books");

const app = express();
nunjucks.configure("views", {
    autoescape: true,
    express: app,
});

app.set("view engine", "njk");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    } 
}));

app.use("/public", express.static("./public"));
app.use(express.static("./node_modules/bootstrap/dist"));
app.use("/books", Book);
app.use("/authors", Author);
app.get("/", (req, res) => {
    res.redirect("/books");
})


app.listen(8080);