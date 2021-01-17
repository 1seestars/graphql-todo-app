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
    }
  }
}
