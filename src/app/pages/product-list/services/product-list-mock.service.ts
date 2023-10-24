import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import mockResponses from './../../../../../server-mock/mockResponses.json';

export const MOCKED_PADEL_PRODUCTS_CAT = mockResponses['padelProductsCatala'];

@Injectable({
  providedIn: 'root',
})
export class ProductListDataService {
  getMockedProductsData(): Observable<any> {
    const result = new Observable((subscriber) => {
      const data = MOCKED_PADEL_PRODUCTS_CAT;
      subscriber.next(data);
    });
    return result;
  }
}
