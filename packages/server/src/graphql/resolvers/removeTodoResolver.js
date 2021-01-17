const todos = require('../../data.json')
const { makeChanges } = require('../../helpers/makeChanges')

module.exports = {
  Mutation: {
    removeTodo: (_, { id }) => {
      const index = todos.findIndex((todo) => todo.id === id)
      const removedTodo = todos.splice(index, 1)[0]
      makeChanges(todos)

      return removedTodo
    }
  }
}
