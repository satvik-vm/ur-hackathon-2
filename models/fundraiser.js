const mongoose = require("mongoose");

const fundraiserSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true],
    },

    description: {
        type: String,
        required: [true]
    },

    organiser: {
        type: String,
        required: [true]
    },

    target: {
        type: Number,
        required: [true]
    },

    current_value: {
        type: Number,
        default: 0,
    },

    account_number: {
        type: String,
        required: [true],
    },

    expiry_date: {
        type: Date,
        required: [true]
    },
});

const fundraiserModel = new mongoose.model("fundraiser", fundraiserSchema);

module.exports = fundraiserModel;