const sortByTotalRooms = require('lib/sort-by-total-rooms')
const getRoomsToBeIluminated = require('lib/get-rooms-to-be-Iluminates')

module.exports = (rooms, matriz) => {
  const smallerLightSpectrumRooms = rooms.filter(
    (room) => room.totalRooms === rooms[0].totalRooms
  )

  const roomWithMoreLighting = smallerLightSpectrumRooms
    .map((room) => {
      const rooms = room.roomsCoordinates.map((coordinates) =>
        getRoomsToBeIluminated(coordinates.x, coordinates.y, matriz)
      )

      rooms.sort(sortByTotalRooms)

      return rooms.pop() || null
    })
    .filter((room) => room !== null)
    .sort(sortByTotalRooms)
    .pop()

  return roomWithMoreLighting
}
