const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User
module.exports = app => {
    app.use(passport.initialize())
    app.use(passport.session())
    passport.serializeUser((user, done) => {
      done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
       User.findByPk(id)
         .then(user => done(null, user.toJSON()))
         .catch(err => done(err))
    })
    passport.use(new localStrategy({usernameField: 'email', passReqToCallback: true}, (req, email, password, done) => {
      User.findOne({where: {email}})
        .then((user) => {
          if(!user){return done(null, false, {message: 'Please register first'})}
          return bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (!isMatch) { return done(null, false, { message: 'Email or Password incorrect.' }) }
              return done(null, user)
            })
            .catch(err => { return done(err) })
        })
        .catch(err => {return done(err)})
    }))
}