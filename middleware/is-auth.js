exports.isAuth = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
}

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        //roles is an array
        if (!roles.includes(req.user.role)) {
            return next(new Error('You do not have permission to perform this action'));
        }

        next();
    }
}