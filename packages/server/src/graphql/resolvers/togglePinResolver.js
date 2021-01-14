const todos = require('../../data.js')

module.exports = {
  Mutation: {
    togglePin: (_, { id }) => {
      const index = todos.findIndex((todo) => todo.id === id)
      const todo = todos.splice(index, 1)[0]

      if (todo.isPinned) {
        todos.push(todo)
      } else {
        todos.unshift(todo)
      }

      todo.isPinned = !todo.isPinned

      return todo
    }
  }
}
