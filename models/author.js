const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },
    yearOfBirth: {
        type: Number,
        required: false,
        min: 0,
        max: 2000,
    },
});

const Author = mongoose.model("authors", authorSchema);
module.exports = Author;