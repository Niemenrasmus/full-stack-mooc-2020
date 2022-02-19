  const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('conntecting to', config.mongoUrl)

mongoose.connect(config.mongoUrl, { useNewUrlParser: true, 
                            useUnifiedTopology: true, 
                            useFindAndModify: false, 
                            useCreateIndex: true 
})
.then(result => {
    console.log('connected to MongoDB')
  })
.catch(e => {
    console.log("Error connecting to MongoDB", e);
    }); 
   
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/reset')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app 