const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;
        const user = new User({email, username});
        const registerdUser = await User.register(user, password);
        req.login(registerdUser, err => {
            if (err) next(err);
            req.flash('success', 'Welcome to GreenCamp!');
            res.redirect('/campgrounds');
        })  
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.loggedIn = (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Successfully Logged Out!');
    res.redirect('/campgrounds');
}