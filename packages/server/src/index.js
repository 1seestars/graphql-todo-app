const { ApolloServer } = require('apollo-server')
const { importSchema } = require('graphql-import')
const todoResolver = require('./graphql/resolvers/todosResolver.js')
const addTodoResolver = require('./graphql/resolvers/addTodoResolver.js')

const typeDefs = importSchema(`${__dirname}/graphql/schema/schema.graphql`)

const server = new ApolloServer({
  typeDefs,
  resolvers: [todoResolver, addTodoResolver]
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
