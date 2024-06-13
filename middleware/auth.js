const withAuth = async (req, res, next) => {
    console.log(req.session.loggedIn);
    if (!req.session.loggedIn) {
        await req.session.destroy();
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;
