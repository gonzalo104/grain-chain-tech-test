const getRoomsToBeIluminated = require('lib/get-rooms-to-be-Iluminates')
const sortByTotalRooms = require('lib/sort-by-total-rooms')

module.exports = (matriz) => {
  const rooms = []

  matriz.forEach((yElements, y) => {
    yElements.forEach((value, x) => {
      if (value !== 0) return
      const iluminatedRooms = getRoomsToBeIluminated(x, y, matriz)
      rooms.push(iluminatedRooms)
    })
  })

  rooms.sort(sortByTotalRooms)

  return rooms
}
