require('../../config')
const roomsToBeIluminated = require('./rooms-to-be-iluminated')

module.exports = app => {
  roomsToBeIluminated(app)
}
