const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()
const schema = require('./graphql/schema/schema')
const logger = require('winston')



app.use(
   '/graphql',
    graphqlHTTP({
        schema : schema,
        graphiql :true,
    }),
)

app.listen(4000, () => logger.info("Welcome to VITCMUN 2020"))
