const copy = (text: string): void => {
  if (navigator?.clipboard?.writeText) {
    navigator.clipboard.writeText(text)
  } else {
    console.warn(`Clipboard copy isn't implemented`)
  }
}

export default copy
