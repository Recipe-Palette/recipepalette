const parseTime = rawTime => {
  let total = 0
  let [hours, minutes] = rawTime.split(':')
  hours = parseInt(hours)
  minutes = parseInt(minutes)
  hours = hours * 60

  total = hours + minutes

  return total
}

const formatTime = rawMinutes => {
  const hours = Math.floor(rawMinutes / 60)
  const minutes = rawMinutes % 60

  return `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`
}

export { parseTime, formatTime }
