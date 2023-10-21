// cart-state.ts
import { PadelProduct } from '@app/pages/product-list/services/product-list.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface CartItem {
  product: PadelProduct;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export const initialCartState: CartState = {
  items: [],
};

export const selectCartState = createFeatureSelector<CartState>('cart');
export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items
);
