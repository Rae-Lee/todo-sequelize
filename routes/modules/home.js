const express = require('express')
const db = require('../../models')
const Todo = db.Todo
const router = express.Router()

router.get('/', (req, res) => {
  const UserId = req.user.id
  return Todo.findAll({ raw: true, nest: true, where: { UserId } })
    .then(todos => res.render('index', {todos}))
    .catch(err => console.log(err))
})

module.exports = router