const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    token: {
      type: String,
      default: "",
    },
    phone: String,
    avatar: String,
    role: String,
    status: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Accounts = mongoose.model("Accounts", accountSchema, "accounts");
module.exports = Accounts;
