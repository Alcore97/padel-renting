import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '@app/pages/cart/services/cart.service';
import { PadelProduct } from '@app/pages/product-list/services/product-list.model';
import { Router } from '@angular/router';
import { discountMap, discountsList } from './config/cart-summary.utils';
import { PurchasedProductsService } from '@app/pages/purchased-products/services/purchased-products.service';
import { DiscountService } from './services/discount.service';

@Component({
  standalone: true,
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class CartSummaryComponent {
  cartItems: PadelProduct[] = [];
  discountCode: string = '';
  appliedDiscount: number = 0;
  attemptedDiscount = false;
  showDiscountCodeError: boolean = false;
  showFijo2DiscountError: boolean = false;
  discountAppliedMessage: string = '';
  alreadyAppliedMessage: string = '';
  constructor(
    private cartService: CartService,
    private router: Router,
    private purchasedServices: PurchasedProductsService,
    private discountServices: DiscountService
  ) {}
  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  checkIfRegisteredDiscount() {
    return discountsList.includes(this.discountCode);
  }

  manageErrors() {
    if (!this.checkIfRegisteredDiscount()) {
      this.showDiscountCodeError = true;
      this.discountAppliedMessage = '';
    } else {
      //SI EXISTE EL CODIGO
      this.showDiscountCodeError = false;
      if (
        this.discountCode === 'FIJO2' &&
        !this.discountServices.getFijoCode().alreadyUsed
      ) {
        this.discountAppliedMessage = `Codi de descompte aplicat amb exit. Número d'usos restrants: ${
          this.discountServices.getFijoCode().maxUses - 1
        }`;
        this.alreadyAppliedMessage = '';
      } else if (
        this.discountCode === 'FIJO2' &&
        this.discountServices.getFijoCode().alreadyUsed
      ) {
        this.alreadyAppliedMessage = 'Ya has utilitzat FIJO2 en aquesta compra';
        this.discountAppliedMessage = '';
      } else if (
        this.discountCode !== 'FIJO2' &&
        !this.discountServices.getAiballCode().alreadyUsed
      ) {
        this.discountAppliedMessage = `Codi de descompte aplicat amb exit`;
        this.alreadyAppliedMessage = '';
      } else {
        this.alreadyAppliedMessage =
          'Ya has utilitzat AIBALL10 en aquesta compra';
        this.discountAppliedMessage = '';
      }
    }

    if (
      this.discountCode === 'FIJO2' &&
      this.discountServices.getFijoCode().maxUses === 0
    ) {
      this.showFijo2DiscountError = true;
      this.discountAppliedMessage = '';
    } else {
      this.showFijo2DiscountError = false;
    }
  }

  getTotal(): number {
    const total = this.cartItems.reduce(
      (total, item) => total + item.quantity * item.preu,
      0
    );

    return parseFloat(total.toFixed(2));
  }
  applyDiscount() {
    this.attemptedDiscount = true;
    const discountGroup = discountMap;
    this.manageErrors();
    if (
      this.discountCode === 'AIBALL10' &&
      !this.discountServices.getAiballCode().alreadyUsed
    ) {
      this.appliedDiscount += this.getTotal() * discountGroup['AIBALL10'];

      this.discountServices.getAiballCode().alreadyUsed = true;
    } else if (
      this.discountCode === 'FIJO2' &&
      this.discountServices.getFijoCode().maxUses > 0 &&
      !this.discountServices.getFijoCode().alreadyUsed
    ) {
      this.appliedDiscount = this.appliedDiscount || 0;
      this.appliedDiscount += discountGroup['FIJO2'];

      this.discountServices.getFijoCode().alreadyUsed = true;
    } else {
    }

    this.discountCode = '';
  }
  calculateTotalWithDiscount(): number {
    return this.getTotal() - this.appliedDiscount;
  }
}
