const todos = require('../../data.js')

module.exports = {
  Mutation: {
    removeTodo: (_, { id }) => {
      const index = todos.findIndex((todo) => todo.id === id)
      todos.splice(index, 1)

      return todos
    }
  }
}
