import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import expressGraphQL from 'express-graphql'
import mongoose from 'mongoose'
import morgan from 'morgan'

import schema from './schema/schema'

mongoose.connect('mongodb://localhost/pub-crawl', {useMongoClient: true})

const app = express()
const port = process.env.PORT || 5000

app.use(cors('*'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('tiny'))

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
}))

app.listen(port, () => console.log('Running on port:', port))