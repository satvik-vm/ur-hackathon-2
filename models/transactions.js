const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema({
    account_number: {
        type: String,
        required: [true],
        unique: [true],
    },

    transaction: [
        {
            hash_id: {
                type: String,
                required: [true]
            },

            amount: {
                type: String,
                required: [true],
            },

            timestamp : {
                type: String,
            },

            type: {
                type: String,
            }
        }
    ]
});

const transactionModel = mongoose.model("transactions", transactionsSchema);

module.exports = transactionModel;