exports.getLogin = (req, res, next) => {
    return res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login'
    });
};

exports.getPost = (req, res, next) => {
    res.setHeader('Set-Cookie', 'loggedIn=true');
    return res.redirect(303, '/');
};