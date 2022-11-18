const express = require('express')
const router = express.Router()
const user = require('./modules/user')
const todo = require('./modules/todo')
router.use('/users', user)
router.use('/', todo)
module.exports = router
