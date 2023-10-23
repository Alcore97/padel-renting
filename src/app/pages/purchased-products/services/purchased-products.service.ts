import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PurchasedProductsService {
  purchasedProducts: any[] = []; // Arreglo para almacenar productos comprados
  totalAmount: number = 0;
  constructor() {}

  addProduct(product: any) {
    // Buscar si el producto ya existe en la lista
    const existingProduct = this.purchasedProducts.find(
      (p) => p.id === product.id
    );

    if (existingProduct) {
      // Si el producto ya existe, aumenta la cantidad en 1
      existingProduct.quantity++;
    } else {
      // Si el producto no existe, agrégalo con cantidad 1
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
