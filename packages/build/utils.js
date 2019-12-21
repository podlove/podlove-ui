const prepend = (input, prefix) => (prefix ? `${prefix}/${input}` : input)

module.exports = {
  prepend
}
