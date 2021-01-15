const todos = require('../../data.json')
const { makeChanges } = require('../../helpers/makeChanges')

module.exports = {
  Mutation: {
    addTodo: (_, { body }) => {
      const newTodo = {
        id: `${Date.now()}`,
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
