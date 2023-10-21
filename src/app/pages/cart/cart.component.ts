import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '@app/components/product-card/product-card.component';
import { ProductDetailModalComponent } from '@app/components/product-detail-modal/product-detail-modal.component';
import { useCartStore } from 'src/store/cartStore';

@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
  imports: [RouterModule, ProductCardComponent],
})
export class CartComponent {
  // public storedProducts = useCartStore((state) => state.cart);

  ngOnInit() {}

  removeFormCart(productToRemove: any) {
    // const removeFromCart = useCartStore((state) => state.removeFromCart);
    // removeFromCart(productToRemove);
  }
}
