module.exports = (position, axis) => {
  const idxWalls = axis.reduce(
    (current, value, idx) => {
      if (value === 1 && idx < position && idx > current.prev) {
        current.prev = idx
      }

      if (value === 1 && idx > position && idx < current.next) {
        current.next = idx
      }
      return current
    },
    { prev: -1, next: axis.length }
  )

  const idxRoomsToBeIlluminated = []

  axis.forEach((room, idx) => {
    if (
      idx > idxWalls.prev &&
      idx < idxWalls.next &&
      room === 0 &&
      position !== idx
    ) {
      idxRoomsToBeIlluminated.push(idx)
    }
  })

  const total = axis
    .slice(idxWalls.prev + 1, idxWalls.next)
    .filter((e) => e === 0).length

  return {
    total,
    idxRoomsToBeIlluminated
  }
}
