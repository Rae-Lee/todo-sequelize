const express = require('express')
const db = require('../../models')
const Todo = db.Todo
const router = express.Router()

router.get('/', (req, res) => {
  res.render('main')
})

module.exports = router