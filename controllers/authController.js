const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    //console.log(req.flash);
    console.log(`message: ${message}`);
    if(message.length > 0) {
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


    if(email != "a@a.com") {
        req.flash('error', 'Invalid email or password.');
        console.log("setado!");
    }

    return res.redirect(303, '/login');
};