const todos = require('../../data.json')
const { makeChanges } = require('../../helpers/makeChanges')

module.exports = {
  Mutation: {
    removeTodo: (_, { id }) => {
      const index = todos.findIndex((todo) => todo.id === id)
      todos.splice(index, 1)
      makeChanges(todos)

      return todos
    }
  }
}
