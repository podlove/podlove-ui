const copy = (text) => {
  if (navigator?.Clipboard?.writeText) {
    navigator.Clipboard.writeText(text)
  } else {
    console.warn(`Clipboard copy isn't implemented`)
  }
}

export default copy
