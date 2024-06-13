const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const categoriesSchema = new mongoose.Schema(
  {
    title: String,
    parent: {
      type: String,
      default: "",
    },
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
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

const Categories = mongoose.model("Categories", categoriesSchema, "categories");
module.exports = Categories;
