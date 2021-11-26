const countRoomsByAxis = require('lib/count-rooms-by-axis')

module.exports = (x, y, matriz) => {
  const xAxis = matriz[y]
  const yAxis = matriz.map((item) => item[x])
  const totalXAxis = countRoomsByAxis(x, xAxis)
  const totalYAxis = countRoomsByAxis(y, yAxis)

  const xCoordinates = totalXAxis.idxRoomsToBeIlluminated.map((idx) => ({
    x: idx,
    y
  }))

  const yCoordinates = totalYAxis.idxRoomsToBeIlluminated.map((idx) => ({
    x,
    y: idx
  }))

  const roomsCoordinates = [...xCoordinates.concat(yCoordinates), { x, y }]

  return {
    totalRooms: totalXAxis.total + totalYAxis.total - 1,
    roomsCoordinates,
    x,
    y
  }
}
