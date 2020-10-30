const { model, Schema } = require("mongoose");
const accountSchema = new Schema(
  {
    _id: { type: String, required: true },
    balance: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const accountBalanceModel = model("account", accountSchema);

module.exports = accountBalanceModel;
