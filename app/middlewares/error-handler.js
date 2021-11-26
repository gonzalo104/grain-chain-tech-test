const Boom = require('@hapi/boom')
const log = require('lib/logger')

const defaultError = {
  message: 'Internal Server Error',
  statusCode: 500
}

class ErrorHandler {
  format (originalError = defaultError, guid = '', res) {
    return Promise.resolve()
      .then(() => {
        const { message: originalMessage, code } = originalError

        const { output: { payload: { statusCode, message, error } } } = Boom.boomify(new Error(originalMessage), { statusCode: code })

        const response = {
          message,
          type: error,
          statusCode,
          path: originalError.path || ''
        }

        log.error(originalError, response, guid)

        if (res) {
          return res.status(statusCode).json({ error: response })
        }

        return Promise.reject(response)
      })
  }
}

module.exports = new ErrorHandler()
