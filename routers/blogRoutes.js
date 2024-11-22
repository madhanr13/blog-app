const express = require("express");
const multer = require("multer");
const router = express.Router();

const {
  createNewBlogPost,
  renderCreateBlogPage,
  renderBlogPostPage,
} = require("../controllers/blogControllers");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user._id}- ${Date.now()} ${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.get("/create", renderCreateBlogPage);
router.get("/view/:id", renderBlogPostPage);
router.post("/create", upload.single("coverImage"), createNewBlogPost);

module.exports = router;
