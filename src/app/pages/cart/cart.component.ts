import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductCardComponent } from '@app/components/product-card/product-card.component';
import { ProductDetailModalComponent } from '@app/components/product-detail-modal/product-detail-modal.component';
import { CartService } from './services/cart.service';
import { PadelProduct } from '../product-list/services/product-list.model';
import { CommonModule } from '@angular/common';
import { BottomNavbarComponent } from '@app/components/bottom-navbar/bottom-navbar.component';

@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [
    RouterModule,
    ProductCardComponent,
    CommonModule,
    ProductDetailModalComponent,
    BottomNavbarComponent,
  ],
})
export class CartComponent {
  cartProducts: PadelProduct[] = [];
  productDetailsToShow: PadelProduct;
  showModal: boolean = false;
  constructor(private cartService: CartService, private router: Router) {}
  ngOnInit() {
    this.cartProducts = this.cartService.getCartItems();
  }

  viewDetailsFromCart(productToView: any) {
    this.showModal = !this.showModal;
    this.productDetailsToShow = productToView;
  }

  closeModal() {
    this.showModal = !this.showModal;
  }

  removeFormCart(productToRemove: any) {
    this.cartService.removeFromCart(productToRemove);
  }

  goToCheckout() {
    this.router.navigate(['/precheckout']);
  }
}
