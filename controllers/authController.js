exports.getLogin = (req, res, next) => {
    console.log(req.get('Cookie'));
    console.log(req.session.isLoggedIn);
    return res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login'
    });
};

exports.getPost = (req, res, next) => {
    console.log("aqui", req.session);
    req.session.isLoggedIn = 'true';
    return res.redirect(303, '/');
};