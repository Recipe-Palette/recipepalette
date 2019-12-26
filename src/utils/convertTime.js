const convertTime = time => {
  if (time > 60) {
    const hours = Math.floor(time / 60)
    const minutes = time % 60
    time = `${hours}h ${minutes}m`
  } else {
    time = `${time}m`
  }

  return time
}

export { convertTime }
