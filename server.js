import express from 'express'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'

const app = express()
const port = process.env.PORT || 4000

const data = {
    pallets: [
      { id: 'RC11212121', status: 'PICKED', item:'323232', quantity:4 },
      { id: 'RC23232323', status: 'PICKED', item:'3012121', quantity:5 },
      { id: 'RC555555', status: 'ONPICK', item:'3012121', quantity:5 },
    ],
}

const typeDefs = `
type Pallets {
  id: ID!
  status: String
  item: String
  quantity: Int
}

type Query {
  pallets: [Pallets]
}
`
const resolvers = {
    Query: {
      pallets: (obj, args, context, info) => context.pallets,
    },
  }
  
const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
})


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
    '/graphql',
    graphqlHTTP({
      schema: executableSchema,
      context: data,
      graphiql: true,
    })
)

app.get('/', (request, response) => {
  response.send('Hello, GraphQL!')
})

app.listen(port, () => {
  console.log(`Running a server at http://localhost:${port}`)
})