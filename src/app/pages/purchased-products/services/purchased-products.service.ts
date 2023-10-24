import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PurchasedProductsService {
  purchasedProducts: any[] = [];
  totalAmount: number = 0;
  constructor() {}

  addProduct(product: any) {
    const existingProduct = this.purchasedProducts.find(
      (p) => p.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      product.quantity = 1;
      this.purchasedProducts.push(product);
    }
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
