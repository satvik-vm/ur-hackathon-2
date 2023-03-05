const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    main_account: {
        type: String,
        required: [true]
    },

    demat_account: {
        type: String,
    },

    fd_accounts: {
        tags: [{
            type: String
        }]
    }
});

const accountModel = mongoose.model("account", accountSchema);

module.exports = accountModel;