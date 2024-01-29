const express = require("express");

const Author = require("../models/author");

const Router = express.Router();

Router.get("/", (req, res) => {
  Author.find()
    .then((authors) => {
      res.status(200).send({
        authors: authors,
      });
    })
    .catch((error) => {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "Error at finding all authors",
        error: error.message,
      });
    });
});

Router.post("/", (req, res) => {
  const newAuthor = new Author({
    name: req.body.name,
    yearOfBirth: req.body.yearOfBirth,
  });

  newAuthor
    .save()
    .then((newAuthor) => {
      res.status(200).send({
        Author: newAuthor,
      });
    })
    .catch((error) => {
      res.status(400).send({
        statusCode: res.statusCode,
        error: "Error at saving Author",
        message: error.message,
      });
    });
});

Router.delete("/:id", (req, res) => {
  Author.findByIdAndDelete(req.params.id)
    .then((authorDeleted) => {
      if (authorDeleted) {
        res.status(200).send({
          Author: authorDeleted,
        });
      } else {
        res.status(404).send({
          statusCode: res.statusCode,
          error: "Didn't find the Author",
        });
      }
    })
    .catch((error) => {
      res.status(404).send({
        statusCode: res.statusCode,
        error: "Error at deleting Author.",
        message: error.message,
      });
    });
});

module.exports = Router;
