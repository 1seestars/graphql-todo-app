const todos = require('../../data.json')
const { makeChanges } = require('../../helpers/makeChanges')

module.exports = {
  Mutation: {
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
