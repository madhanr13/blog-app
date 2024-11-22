const Blog = require("../models/blog");

exports.renderCreateBlogPage = function (req, res) {
  res.render("createBlog", {
    user: req.user,
  });
};

exports.createNewBlogPost = async function (req, res) {
  const { title, content } = req.body;
  try {
    if (!title || !content) throw new Error("All feilds are required");
    await Blog.create({
      content,
      title,
      coverImage: req.file.filename,
      createdBy: req.user._id,
    });
    res.render("createBlog", {
      message: "Your blog has been created successfully!",
    });
  } catch (error) {
    res.render("createBlog", {
      error,
    });
  }
};

exports.renderBlogPostPage = async function (req, res) {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    console.log(blog);
    return res.render("blog", {
      user: req.user,
      blog,
    });
  } catch (error) {
    res.render("home");
  }
};
