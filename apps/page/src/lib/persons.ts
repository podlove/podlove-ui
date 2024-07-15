import { curry } from 'lodash-es';
import type { Person } from '../types/feed.types';

export const findPerson = curry((persons: Person[], query: string): Person | null => {
  const person: Person | undefined = persons.find(
    (person: Person) => query === person.id || person.name.toLocaleLowerCase().startsWith(query)
  );

  return person || null;
});
