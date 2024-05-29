const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.signupPage = (req, res) => {
    res.render('signup');
};

exports.loginPage = (req, res) => {
    res.render('login');
};

exports.signup = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.redirect('/users/login');
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user._id;
        res.redirect('/users');
    } else {
        res.redirect('/users/login');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/users/login');
};

exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.render('users', { users });
};

exports.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
};

exports.updateUser = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/users');
};

exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users');
};
