const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const rolesSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    permissions: {
      type: Array,
      default: [],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
    slug: { type: String, slug: "title", unique: true },
  },
  {
    timestamps: true,
  }
);

const Roles = mongoose.model("Roles", rolesSchema, "roles");
module.exports = Roles;
