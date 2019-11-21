function isAuthenticated(req, res, next) {
    if (req.session.userInfo)
        return next();
    else
        res.redirect('/user/login')
}

module.exports = isAuthenticated