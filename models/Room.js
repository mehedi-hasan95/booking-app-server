const { mongoose } = require("mongoose");

const roomSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    maxPeople: {
        type: Number,
        required: true,
    },
    roomNumber: [{ number: Number, unvaluableDate: [{ type: Date }] }],
    desc: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Room", roomSchema);
