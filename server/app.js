const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()
const schema = require('./graphql/schema/schema')
const logger = require('winston')
const passport = require('passport')
const bodyParser = require('body-parser')
const cors = require('cors')
const auth_router = require('./routes/auth.routes')
const api_router = require('./routes/api.routes')
const auth_middleware = require('./middleware/auth.middleware')

const PORT = process.env.WEBAPP_PORT || 3000

require('./passport/passport')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use('/auth',auth_router)
app.use('/api',auth_middleware.jwt_auth,api_router)

app.use(
   '/graphql',
    graphqlHTTP({
        schema : schema,
        graphiql :true,
    }),
)

app.listen(PORT, () => logger.info("Welcome to VITCMUN 2020"))
