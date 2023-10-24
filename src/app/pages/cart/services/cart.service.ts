import { Injectable } from '@angular/core';
import { PadelProduct } from '@app/pages/product-list/services/product-list.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: PadelProduct[] = [];
  public productListResponse: any;

  constructor() {}

  addToCart(product: PadelProduct, totalProducts: PadelProduct[]) {
    const existingItem = this.cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      if (existingItem.stock > 0) {
        existingItem.quantity += 1;
        const productInList = totalProducts.find(
          (item) => item.id === product.id
        );
        if (productInList) {
          productInList.stock -= 1;
        }
      } else {
        console.error(
          'No puedes agregar más de este producto al carrito. Stock agotado.'
        );
      }
    } else {
      if (product.stock > 0) {
        product.quantity = 1;
        this.cartItems.push(product);
        const productInList = totalProducts.find(
          (item) => item.id === product.id
        );
        if (productInList) {
          productInList.stock -= 1;
        }
      } else {
        console.error(
          'No puedes agregar este producto al carrito. Stock agotado.'
        );
      }
    }
  }

  removeFromCart(product: PadelProduct) {
    const index = this.cartItems.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      const item = this.cartItems[index];
      item.stock++;
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        this.cartItems.splice(index, 1);
      }
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
  }
}
