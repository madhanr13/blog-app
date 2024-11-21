const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/create", function (req, res) {
  res.render("createBlog");
});

router.post("/create", upload.single("coverImage"), function (req, res) {
  console.log(req.body);
  console.log(req.file);
  res.render("createBlog");
});

module.exports = router;
