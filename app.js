require('./config')
const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const cors = require('cors')
const morgan = require('morgan')
const guid = require('express-request-id')()
const app = express()
const routers = require('app/routers')
const server = http.createServer(app)

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

app.use(guid)
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routers(app)

app.use((err, req, res, next) => {
  const { message = 'Internal error', code = 500 } = err
  console.log(err)
  return res.status(code).json({ error: message })
})

module.exports = server
