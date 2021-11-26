const winston = require('winston')

const defaultExcludeKeys = ['password', 'AccountSid']

const omitDeep = (data, excludeKeys = []) => {
  if (!data || typeof data !== 'object') {
    return data
  }

  excludeKeys = [...excludeKeys, ...defaultExcludeKeys]

  return Object.keys(data).reduce((result, key) => {
    if (!excludeKeys.includes(key) && Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key]

      if (typeof value === 'object') {
        result[key] = omitDeep(value)
      } else {
        result[key] = value
      }
    }

    return result
  }, {})
}

const loggerMock = () => ({
  info: () => {},
  warn: () => {},
  error: () => {}
})

class Logger {
  constructor () {
    // eslint-disable-next-line
    this.logger = new winston.createLogger({
      transports: [
        new winston.transports.Console({
          level: 'debug',
          label: this.getFilePath(module),
          handleException: true,
          json: false,
          colorize: true,
          timestamp: true,
          formatter: options => {
            const info = {
              level: options.level.toUpperCase(),
              data: options.meta
            }

            info.data.timestamp = new Date().getTime()
            return JSON.stringify(info)
          }
        })
      ]
    })

    if (process.env.REMOVE_LOG) {
      this.logger = loggerMock()
    }
  }

  getFilePath (module) {
    return module.filename.split('/').slice(-2).join('/')
  }

  info (message, data = {}, guid = '', type = '') {
    const clonedData = omitDeep(data)
    const obj = {
      guid,
      type,
      message,
      data: JSON.stringify(clonedData)
    }

    this.logger.info(obj)
  }

  warn (message, data = {}, guid = '') {
    const cloneData = omitDeep(data)

    const obj = {
      guid,
      message,
      data: JSON.stringify(cloneData)
    }

    this.logger.warn(obj)
  }

  error (error, data = {}, guid = '') {
    const clonedData = omitDeep(data)
    const { message, stack } = error

    const obj = {
      guid,
      message,
      stack,
      error,
      data: JSON.stringify(clonedData)
    }

    this.logger.error(obj)
  }
}

module.exports = new Logger()
