import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '@app/components/product-card/product-card.component';
import { ProductDetailModalComponent } from '@app/components/product-detail-modal/product-detail-modal.component';
import { CartService } from './services/cart.service';
import { PadelProduct } from '../product-list/services/product-list.model';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '@app/components/footer/footer.component';

@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [
    RouterModule,
    ProductCardComponent,
    CommonModule,
    FooterComponent,
    ProductDetailModalComponent,
  ],
})
export class CartComponent {
  cartProducts: PadelProduct[] = [];
  productDetailsToShow: PadelProduct;
  showModal: boolean = false;
  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.cartProducts = this.cartService.getCartItems();
    console.log(this.cartProducts);
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
}
