// cart.reducer.ts
import { createReducer, on } from '@ngrx/store';
import {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from './cart-actions';
import { CartItem, CartState, initialCartState } from './cart-state';

export const cartReducer = createReducer(
  initialCartState,
  on(addToCart, (state, { product }) => {
    // Comprobar si el producto ya está en el carrito
    const existingItem = state.items.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      // Actualizar la cantidad del producto en el carrito
      const updatedItems = state.items.map((item) => {
        if (item.product.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      return { ...state, items: updatedItems };
    } else {
      // Agregar el producto al carrito con cantidad 1
      const newItem: CartItem = { product, quantity: 1 };
      return { ...state, items: [...state.items, newItem] };
    }
  }),

  on(removeFromCart, (state, { productId }) => {
    // Eliminar el producto del carrito
    const updatedItems = state.items.filter(
      (item) => item.product.id !== productId
    );
    return { ...state, items: updatedItems };
  }),

  on(updateCartItemQuantity, (state, { productId, quantity }) => {
    // Actualizar la cantidad de un producto en el carrito
    const updatedItems = state.items.map((item) => {
      if (item.product.id === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    return { ...state, items: updatedItems };
  })
);
