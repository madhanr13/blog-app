const { generateTokenForUser } = require("../utils/auth");
const User = require("../models/user");

exports.handleUserLogin = async function (req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) throw new Error("Email and password is required");
    const user = await User.findOne({ email });
    if (!user) throw new Error(`User  with ${email} doesn't exist`);
    if (user.password !== password) throw new Error(`Invalid Password`);

    //Token
    const token = await generateTokenForUser(user._id);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    res.render("signup", {
      error,
    });
  }
};

exports.handleUserSignup = async function (req, res) {
  const { fullname, email, password } = req.body;
  try {
    if (!fullname) throw new Error("Fullname is required");
    if (!email) throw new Error("Email is required");
    if (!password || password.length < 6)
      throw new Error("Password is required with minimum 6 characters");

    const user = await User.create({ fullname, email, password });
    const token = await generateTokenForUser(user._id);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    res.render("signup", {
      error,
    });
  }
};
