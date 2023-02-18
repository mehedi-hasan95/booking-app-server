const mongoose = require("mongoose");

const userCategory = new mongoose.Schema(
    {
        categories: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Category", userCategory);
