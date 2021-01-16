const todos = require('../../data.json')

module.exports = {
  Query: {
    todosInfo: (_, { offset, limit = 10 }) => ({
      data: todos.slice(offset, offset + limit),
      count: todos.length
    })
  }
}
