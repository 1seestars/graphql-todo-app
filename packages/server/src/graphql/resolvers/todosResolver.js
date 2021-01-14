const todos = require('../../data.json')

module.exports = {
  Query: {
    todos: () => todos
  }
}
