const express = require("express");
const router = express.Router();
const {
  handleUserSignup,
  handleUserLogin,
} = require("../controllers/userControllers");

router.post("/login", handleUserLogin);
router.post("/signup", handleUserSignup);
router.get("/logout", function (req, res) {
  return res.clearCookie("token").redirect("/");
});

module.exports = router;
