import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  //Servicio para manterner el estado de los codigos de descuento
  private discountCodes: {
    [key: string]: { uses: number; maxUses: number; alreadyUsed: boolean };
  } = {
    AIBALL10: { uses: 0, maxUses: Infinity, alreadyUsed: false }, // Usos infinitos
    FIJO2: { uses: 0, maxUses: 3, alreadyUsed: false }, // Hasta 3 usos
  };
  constructor() {}

  getAiballCode() {
    return this.discountCodes['AIBALL10'];
  }

  getFijoCode() {
    return this.discountCodes['FIJO2'];
  }
}
