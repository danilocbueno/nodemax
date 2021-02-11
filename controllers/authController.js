const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    return res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login'
    });
};

exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect(303, '/login');
    }

    const doMatch = bcrypt.compare(password, user.password);
    if (doMatch) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        await req.session.save();
        return res.redirect(303, '/');
    } else {
        req.flash('error', 'Invalid email or password.');
        return res.redirect(303, '/login');
    }


};

exports.postLogout = async (req, res, next) => {
    console.log("Iam here?");
    try {
        await req.session.destroy();
        res.redirect('/login');
    } catch (err) {
        console.log(err);
    }
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup');
};

exports.postSignup = async (req, res, next) => {
    const { email, password, confirmPassword } = req.body;

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