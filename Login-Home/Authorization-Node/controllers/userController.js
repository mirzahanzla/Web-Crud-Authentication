const User = require("../models/User");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && (await user.comparePassword(password))) {
    const token = jwt.sign({ username: user.username }, "yourSecretKey");
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/home");
  } else {
    res.redirect("/users/login");
  }
};

const signup = async (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });

  await newUser.save();
  res.redirect("/users/login");
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/users/login");
};

module.exports = {
  login,
  signup,
  logout,
};
