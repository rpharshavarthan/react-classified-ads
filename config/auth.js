module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "please login");
    res.redirect("/user/login");
  },
  checkNotAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect("/");
    }
    next();
  },
};
