import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BottomNavbarComponent } from '@app/components/bottom-navbar/bottom-navbar.component';
import { CartSummaryComponent } from '@app/components/cart-summary/cart-summary.component';
import { CartService } from '../cart/services/cart.service';
import { PurchasedProductsService } from '../purchased-products/services/purchased-products.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PadelProduct } from '../product-list/services/product-list.model';
import { DiscountService } from '@app/components/cart-summary/services/discount.service';

@Component({
  standalone: true,
  selector: 'app-pre-checkout',
  templateUrl: './pre-checkout.component.html',
  styleUrls: ['./pre-checkout.component.scss'],
  imports: [
    CartSummaryComponent,
    BottomNavbarComponent,
    FormsModule,
    CommonModule,
  ],
})
export class PreCheckoutComponent {
  cardNumber: string = '';
  cartItems: PadelProduct[] = [];
  showNotAuthorizatedCard: string = '';

  constructor(
    private router: Router,
    private cartService: CartService,
    private purchasedProductsService: PurchasedProductsService,
    private discountServices: DiscountService
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }
  makePayment() {
    if (this.cardNumber === '1234567890123456') {
      const cartItems = this.cartService.getCartItems();

      cartItems.forEach((item) =>
        this.purchasedProductsService.addProduct(item)
      );
      this.cartService.clearCart();
      if (this.discountServices.getFijoCode().alreadyUsed)
        this.discountServices.getFijoCode().maxUses--;

      this.router.navigate(['/purchased-products']);
    } else {
      this.showNotAuthorizatedCard =
        'Tarjeta no válida. Si us plau, intenti amb un altra tarjeta';
    }
  }

  goToProductsList() {
    this.router.navigate(['/products']);
  }
}
