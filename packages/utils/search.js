export const binarySearch = (list = []) => search => {
  let minIndex = 0
  let maxIndex = list.length - 1
  let currentIndex
  let currentElement

  while (minIndex <= maxIndex) {
    currentIndex = ((minIndex + maxIndex) / 2) | 0
    currentElement = list[currentIndex]

    if (currentElement < search) {
      minIndex = currentIndex + 1
    } else if (currentElement > search) {
      maxIndex = currentIndex - 1
    } else {
      return currentIndex
    }
  }

  return maxIndex
}

export const textSearch = (input = []) => (query = '') => {
  const queryExpr = new RegExp(query, 'ig')

  return input.reduce((results, item, index) => {
    const searchHits = item.match(queryExpr) || []

    // add n times the chunk index, for each hit one
    searchHits.forEach(() => {
      results.push(index)
    })

    return results
  }, [])
}
