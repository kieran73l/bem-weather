import { Injectable } from '@angular/core';
import { Query } from 'src/app/interfaces/query.interface';

@Injectable({
  providedIn: 'root',
})
export class Formatter {
  constructor() {}

  public queryFormat(query?: Query): string {
    if (!query) return '';

    const cleanedQuery: Query = {};
    for (const key in query) {
      if (
        Object.prototype.hasOwnProperty.call(query, key) &&
        query[key] !== undefined
      ) {
        cleanedQuery[key] = query[key];
      }
    }

    const queryString =
      Object.keys(cleanedQuery).length === 0
        ? ''
        : `?${Object.entries(cleanedQuery)
            .map(([key, value]) => `${key}=${value}`)
            .join('&')}`;

    return queryString;
  }
}
