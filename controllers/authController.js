const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    //console.log(req.flash);
    console.log(`message: ${message}`);
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    //console.log(req.get('Cookie'));
    //console.log(req.session.isLoggedIn);
    return res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: message
    });
};

exports.postLogin = (req, res, next) => {

    const { email, password } = req.fields;
    req.session.isLoggedIn = 'true';


    if (email != "a@a.com") {
        req.flash('error', 'Invalid email or password.');
        console.log("setado!");
    }

    return res.redirect(303, '/login');
};

exports.postLogout = (req, res, next) => {

};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup');
};

exports.postSignup = async (req, res, next) => {
    const { email, password, confirmPassword } = req.fields;
    try {
        let user = await User.findOne({ where: { email: email } });
        if (user) {
            return res.redirect('/login');
        }

        const hashPasswd = await bcrypt.hash(password, 12);

        user = await User.create({
            email: email,
            password: hashPasswd
        });

        return res.redirect('/login');

    } catch (err) {
        console.log(err);
    }
};