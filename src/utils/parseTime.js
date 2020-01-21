export const parseTime = rawTime => {
  let total = 0
  let [hours, minutes] = rawTime.split(':')
  hours = parseInt(hours)
  minutes = parseInt(minutes)
  hours = hours * 60

  total = hours + minutes

  return total
}
