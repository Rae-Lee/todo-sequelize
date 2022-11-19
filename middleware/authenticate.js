module.exports = {
  authenticate: (req, res, next) => {
    if(req.user){return next()}
    req.flash('warning_msg', 'Please log in first')
    return res.redirect('/users/login')
  }
}