const path = require('path')
require('app-module-path').addPath(path.join(__dirname, '../'))

const dotenv = require('dotenv')
const requireindex = require('es6-requireindex')

const env = process.env.NODE_ENV || 'development'

const fileEnv = path.resolve(__dirname, `../.env.${env}`)

try {
  dotenv.config({
    path: fileEnv,
    silent: true
  })
} catch (e) {
  console.error('Failed to resolve', fileEnv, e)
}

dotenv.config({
  path: path.resolve('.env.default')
})

module.exports = requireindex(__dirname)
