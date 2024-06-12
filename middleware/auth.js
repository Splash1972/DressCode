const withAuth = async (req, res, next) => {
    if (!req.session.loggedIn) {
        await req.session.destroy();
        res.redirect('/homepage-attire');
    } else {
        next();
    }
};

module.exports = withAuth;
