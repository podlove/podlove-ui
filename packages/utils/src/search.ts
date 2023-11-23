import { curry } from 'ramda';

export const binarySearch: any = curry((list: any[], search: number): number => {
  let minIndex = 0;
  let maxIndex = list.length - 1;
  let currentIndex;
  let currentElement;

  while (minIndex <= maxIndex) {
    currentIndex = ((minIndex + maxIndex) / 2) | 0;
    currentElement = list[currentIndex];

    if (currentElement < search) {
      minIndex = currentIndex + 1;
    } else if (currentElement > search) {
      maxIndex = currentIndex - 1;
    } else {
      return currentIndex;
    }
  }

  return maxIndex;
});

export const textSearch: any = curry((input: string[], query: string): number[] => {
  const queryExpr = new RegExp(query, 'ig');

  return input.reduce((results: number[], item, index) => {
    const searchHits = item.match(queryExpr) || [];

    // add n times the chunk index, for each hit one
    searchHits.forEach(() => {
      results.push(index);
    });

    return results;
  }, []);
});
