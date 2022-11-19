const express = require('express')
const router = express.Router()
const user = require('./modules/user')
const todo = require('./modules/todo')
const { authenticate } = require('../middleware/authenticate')
router.use('/users', user)
router.use('/', authenticate() , todo)
module.exports = router
