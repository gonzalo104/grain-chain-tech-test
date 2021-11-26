require('../../config')
const fs = require('fs-extra')
const placeBulbsPerRoom = require('lib/place-bulbs-per-room')
const calculateSmallerLightSpectrumByRoom = require('lib/calculate-smaller-light-spectrum-by-room')
class RoomsToBeIluminatedController {
  async start (req, res, next) {
    try {
      if (!req.file) {
        return next({
          code: 404,
          message: 'file not found'
        })
      }

      const content = await fs.readFile(req.file.path, 'utf-8')
      const originalMatriz = content.split('\n').map(line => line.trim().split('').map(n => Number(n)))

      const startLighting = (matriz) => {
        const rooms = calculateSmallerLightSpectrumByRoom(matriz)

        if (rooms && rooms.length) {
          matriz = placeBulbsPerRoom(matriz, rooms)
          startLighting(matriz)
        }

        return matriz
      }

      const result = startLighting(originalMatriz)

      res.status(200).json({ statusCode: 200, result })
    } catch (error) {
      next({
        ...error,
        code: 400,
        message: error.message || ''
      })
    }
  }
}

module.exports = new RoomsToBeIluminatedController()
