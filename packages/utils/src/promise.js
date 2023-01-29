export const delay = (time) => (data) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(data), time)
  })
