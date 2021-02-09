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
            req.flash('error', 'You do not have permission to perform this action');
            return res.status(303).redirect('back');
        }
        
        next();
    }
}