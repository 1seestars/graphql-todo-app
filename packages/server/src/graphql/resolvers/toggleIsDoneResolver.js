const todos = require('../../data.js')

module.exports = {
  Mutation: {
    toggleIsDone: (_, { id }) => {
      const todo = todos.find((todo) => todo.id === id)
      todo.isDone = !todo.isDone

      return todo
    }
  }
}
