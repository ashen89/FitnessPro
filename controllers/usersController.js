const User = require("../models/user");

module.exports.newForm = (req, res) => {
    res.render("users/register");
};

module.exports.create = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const registerUser = await User.register(user, password);
        req.login(registerUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to the FitnessPro");
            res.redirect("/gymgrounds");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/register");
    }
};

module.exports.loginForm = (req, res) => {
    res.render("users/login");
};

module.exports.login = (req, res) => {
    req.flash("success", "Welcome Back!");
    const redirectUrl = req.session.returnTo || "/gymgrounds";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logOut();
    req.flash("success", "Logout successfully!");
    res.redirect("/login");
};
