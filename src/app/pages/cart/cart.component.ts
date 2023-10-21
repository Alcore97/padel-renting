import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '@app/components/product-card/product-card.component';
import { ProductDetailModalComponent } from '@app/components/product-detail-modal/product-detail-modal.component';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';
import { removeFromCart } from 'src/store/cart-actions';
import { selectCartItems } from 'src/store/cart-state';

@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
  imports: [RouterModule, ProductCardComponent, CommonModule],
})
export class CartComponent {
  constructor(private store: Store) {}

  storedProducts = this.store.select(selectCartItems);

  ngOnInit() {
    this.storedProducts.subscribe((state) => console.log(state));
  }

  removeFormCart(productToRemove: any) {
    this.store.dispatch(removeFromCart({ productId: productToRemove.id }));
  }
}
