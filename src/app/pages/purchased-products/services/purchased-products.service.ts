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
      const clonedProduct = { ...existingProduct };
      clonedProduct.quantity += product.quantity;
      const index = this.purchasedProducts.findIndex(
        (p) => p.id === product.id
      );
      this.purchasedProducts[index] = clonedProduct;
    } else {
      const newProduct = { ...product };
      newProduct.quantity = product.quantity;
      this.purchasedProducts.push(newProduct);
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
