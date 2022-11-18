const express = require('express')
if(process.env.NODE_ENV !== 'production'){
  const dotenv = require('dotenv').config()
}
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const routes = require('./routes')
const app = express()
const port = process.env.port

app.engine('handlebars', exphbs.engine({'defaultLayout': 'main'}))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(methodOverride('_method'))
app.use(routes)
app.listen(port, (req, res) => {console.log('It is running on http://localhost:3000')})