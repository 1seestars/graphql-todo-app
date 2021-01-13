const todos = require('../../data.js')

module.exports = {
  Mutation: {
    addTodo: (_, { body }) => {
      const newTodo = {
        id: `${Date.now()}`,
        body,
        isDone: false,
        createdAt: `${Date.now()}`
      }

      todos.push(newTodo)
      return newTodo
    }
  }
}
