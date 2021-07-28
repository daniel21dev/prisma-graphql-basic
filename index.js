const { ApolloServer } = require('apollo-server')
const resolvers = require('./src/resolvers')
const typeDefs = require('./src/typeDefs')

const server =  new ApolloServer({ typeDefs, resolvers})

server.listen().then(({ url })=>{
  console.log(`🚀  Server ready at ${url}`);
})