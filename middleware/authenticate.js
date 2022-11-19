module.exports = {
  authenticate: (req, res, next) => {
    if (req.isAuthenticated()){return next()}
    req.flash('warning_msg', 'Please log in first')
    return res.redirect('/users/login')
  }
}