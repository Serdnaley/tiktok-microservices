import { DateTime } from 'luxon';

export const sortByDate = (arr, property, direction = 'ASC') => {
  const res = arr.sort((a, b) => {
    const get = (source) => {
      return Array.isArray(property)
        ? property.reduce((obj, p) => obj && obj[p], source)
        : source[property];
    };

    return DateTime.fromISO(get(a)) - DateTime.fromISO(get(b));
  });

  return direction === 'ASC' ? res : res.reverse();
};
