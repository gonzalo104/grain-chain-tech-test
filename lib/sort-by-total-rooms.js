module.exports = (a, b) => {
  if (a.totalRooms > b.totalRooms) {
    return 1
  }
  if (a.totalRooms < b.totalRooms) {
    return -1
  }

  return 0
}
