const todos = require('../../data.json')

module.exports = {
  Query: {
    todosInfo: (_, { offset, limit = 10 }) => ({
      todos: todos.slice(offset, offset + limit),
      quantity: todos.length
    })
  }
}
