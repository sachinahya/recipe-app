import { sortByProp } from '@sachinahya/utils';
import React from 'react';

export const useArraySort = <T>(items: T[] | Dictionary<T>, sortProps: string[]): T[] => {
  return React.useMemo(() => {
    const values = Array.isArray(items) ? items : Object.values(items);
    const sorter = sortByProp(...sortProps);
    return values.sort(sorter);
  }, [items, sortProps]);
};

export const useArrayFilter = <T>(
  items: T[] | Dictionary<T>,
  filterFn?: (item: T) => boolean
): T[] => {
  return React.useMemo(() => {
    let values = Array.isArray(items) ? items : Object.values(items);
    if (filterFn) values = values.filter(filterFn);
    return values;
  }, [items, filterFn]);
};
