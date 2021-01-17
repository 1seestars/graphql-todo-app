const { ApolloServer } = require('apollo-server')
const { importSchema } = require('graphql-import')
const fetchTodosResolver = require('./graphql/resolvers/fetchTodosResolver.js')
const todoActionResolver = require('./graphql/resolvers/todoActionResolver')

const typeDefs = importSchema(`${__dirname}/graphql/schema/schema.graphql`)

const server = new ApolloServer({
  typeDefs,
  resolvers: [fetchTodosResolver, todoActionResolver]
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
