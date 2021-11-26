const getRoomToAnalyze = require('lib/get-room-to-analize')

module.exports = (matriz, rooms) => {
  const room = getRoomToAnalyze(rooms, matriz)
  room.roomsCoordinates.forEach(({ x, y }) => (matriz[y][x] = 'I'))
  matriz[room.y][room.x] = 'L'

  return matriz
}
