const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: new Date(),
    },
    nick: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    comment: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    }
})

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Book's title is mandatory"],
        minlength: [3, "Book's title is too short"],
    },
    editorial: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, "Book's price is mandatory"],
        min: [0, "Book's price must be greater than 0"],
    },
    cover: {
        type: String,
    },
    comments : [commentSchema],
});

const Book = mongoose.model("books", bookSchema);
module.exports = Book;