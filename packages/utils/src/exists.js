export const waitFor = (ref, timeout = 3000) => {
  const start = Date.now()
  const poll = (resolve, reject) => {
    const result = ref()

    if (typeof result !== 'undefined') {
      return resolve(result)
    }

    if (timeout <= Date.now() - start) {
      return reject()
    }

    requestAnimationFrame(poll.bind(this, resolve, reject))
  }

  return new Promise(poll)
}
