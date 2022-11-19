const express = require('express')
if(process.env.NODE_ENV !== 'production'){
  const dotenv = require('dotenv').config()
}
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const routes = require('./routes')
const app = express()
const port = process.env.port
const usePassport = require('./config/passport')
app.engine('handlebars', exphbs.engine({'defaultLayout': 'main'}))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(methodOverride('_method'))
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
app.use(flash(), (req, res, next) => {
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('error')
  next()
})
app.use(routes)
app.listen(port, (req, res) => {console.log('It is running on http://localhost:3000')})