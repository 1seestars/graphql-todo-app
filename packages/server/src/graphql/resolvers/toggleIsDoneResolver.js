const todos = require('../../data.json')
const { makeChanges } = require('../../helpers/makeChanges')

module.exports = {
  Mutation: {
    toggleIsDone: (_, { id }) => {
      const todo = todos.find((todo) => todo.id === id)
      todo.isDone = !todo.isDone
      makeChanges(todos)

      return todo
    }
  }
}
