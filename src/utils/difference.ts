/* eslint-disable no-param-reassign */
import { transform, isEqual, isObject, isDate, compact } from 'lodash';

const difference = (object: any, base: any): any =>
  transform(object, (result, value, key) => {
    if (!isEqual(value, base[key])) {
      if (!isDate(value) && isObject(value) && isObject(base[key])) {
        if (key === 'data') {
          result.where = base.where;
        }

        const diff = difference(value, base[key]);

        result[key] = Array.isArray(diff) ? compact(diff) : diff;
      } else {
        result[key] = value;
      }
    }
  });

export default difference;
