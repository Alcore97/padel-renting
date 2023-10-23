import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PurchasedProductsService {
  purchasedProducts: any[] = []; // Arreglo para almacenar productos comprados
  totalAmount: number = 0;
  constructor() {}

  addProduct(product: any) {
    this.purchasedProducts.push(product);
  }

  getPurchasedProducts() {
    return this.purchasedProducts;
  }

  clearPurchasedProducts() {
    this.purchasedProducts = [];
  }

  updateFinalPrice(newPrice: number) {
    this.totalAmount = newPrice;
  }
}
