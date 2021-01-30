exports.getLogin = (req, res, next) => {
    return res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login'
    });
};

exports.getPost = (req, res, next) => {
    return res.redirect(303, '/');
};