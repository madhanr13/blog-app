const mongoose = require("mongoose");

const blogScheme = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    coverImage: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
const Blog = mongoose.model("Blog", blogScheme);
module.exports = Blog;
