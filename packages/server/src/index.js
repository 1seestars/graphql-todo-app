const { ApolloServer } = require('apollo-server')
const { importSchema } = require('graphql-import')
const todoResolver = require('./graphql/resolvers/todosResolver.js')

const typeDefs = importSchema(`${__dirname}/graphql/schema/schema.graphql`)

const server = new ApolloServer({
  typeDefs,
  resolvers: [todoResolver]
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
