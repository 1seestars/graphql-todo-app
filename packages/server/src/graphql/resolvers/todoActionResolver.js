const todos = require('../../data.json')
const { makeChanges } = require('../../helpers/makeChanges')
const { v4: uuid } = require('uuid')

module.exports = {
  Mutation: {
    addTodo: (_, { body }) => {
      const newTodo = {
        id: uuid(),
        body,
        isDone: false,
        isPinned: false,
        createdAt: `${Date.now()}`
      }

      todos.push(newTodo)
      makeChanges(todos)

      return newTodo
    },
    removeTodo: (_, { id }) => {
      const index = todos.findIndex((todo) => todo.id === id)
      const removedTodo = todos.splice(index, 1)[0]
      makeChanges(todos)

      return removedTodo
    },
    toggleIsDone: (_, { id }) => {
      const todo = todos.find((todo) => todo.id === id)
      todo.isDone = !todo.isDone
      makeChanges(todos)

      return todo
    },
    togglePin: (_, { id }) => {
      const index = todos.findIndex((todo) => todo.id === id)
      const todo = todos.splice(index, 1)[0]

      todo.isPinned ? todos.push(todo) : todos.unshift(todo)
      todo.isPinned = !todo.isPinned
      makeChanges(todos)

      return todo
    }
  }
}
