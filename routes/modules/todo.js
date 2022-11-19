const express = require('express')
const db = require('../../models')
const Todo = db.Todo
const router = express.Router()

router.get('/', (req, res) => {
  return Todo.findAll({ raw: true, nest: true })
    .then(todos => res.render('index', todos))
    .catch(err => console.log(err))
})
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})
module.exports = router