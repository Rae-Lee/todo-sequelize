const express = require('express')
const bcrypt = require('bcryptjs')
const db = require('../../models')
const passport = require('passport')
const User = db.User
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/users/login', failureFlash: true}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: '信箱和密碼是必填!' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼和確認密碼不相同!' })
  }
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }
  User.findOne({ where: { email } }).then(user => {
    if (user) {
      errors.push({ message: '這個信箱已經註冊過了!' })
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword,
        errors
      })
    }
  })    
  return bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => {
      User.create({name, email, password: hash})
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))  
})

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if(err) {return next(err)}
    res.flash('success_msg', 'You have already log out')
    return res.redirect('/users/login')
  })
})
module.exports = router
