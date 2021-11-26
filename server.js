require('./config')
const app = require('./app')
const config = require('config/server')
const logger = require('lib/logger')

const { port } = config

if (!module.parent) {
  app.listen(port, () => {
    logger.info(`Server running ${port}`)
  })
}

module.exports = app
