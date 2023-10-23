import { Injectable } from '@angular/core';
import { PadelProduct } from '@app/pages/product-list/services/product-list.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: PadelProduct[] = [];

  addToCart(product: PadelProduct, totalProducts: PadelProduct[]) {
    const existingItem = this.cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity < existingItem.stock) {
        existingItem.quantity += 1; // Incrementa la cantidad si el producto ya está en el carrito y no se supera el stock
        const productInList = totalProducts.find(
          (item) => item.id === product.id
        );
        if (productInList) {
          productInList.stock -= 1; // Reduce el stock en el productListResponse
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
          productInList.stock -= 1; // Reduce el stock en el productListResponse
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
    console.log('Producto a remover', product);
    console.log('Carrito actual', this.cartItems);
    if (index !== -1) {
      const item = this.cartItems[index];
      if (item.quantity > 1) {
        item.quantity -= 1; // Reduce la cantidad si hay más de un producto
      } else {
        this.cartItems.splice(index, 1); // Elimina el producto si solo hay uno
      }
    }
    console.log('Carrito depues de remover', this.cartItems);
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
  }
}
