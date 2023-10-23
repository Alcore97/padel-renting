import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '@app/pages/cart/services/cart.service';
import { PadelProduct } from '@app/pages/product-list/services/product-list.model';
import { Router } from '@angular/router';
import { discountsList } from './config/ccart-summary.utils';
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
  attemptedDiscount = false; // Bandera para rastrear si se intentó aplicar un descuento
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
    this.purchasedServices.updateFinalPrice(this.getTotal());
  }

  checkIfRegisteredDiscount() {
    const temp = discountsList.includes(this.discountCode);
    return temp;
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
        this.discountAppliedMessage = `Código de descuento aplicado con éxito. Numero de usos restantes: ${
          this.discountServices.getFijoCode().maxUses - 1
        }`;
        this.alreadyAppliedMessage = '';
      } else if (
        this.discountCode === 'FIJO2' &&
        this.discountServices.getFijoCode().alreadyUsed
      ) {
        this.alreadyAppliedMessage = 'Ya has utilizado fijo2 en esta compra';
        this.discountAppliedMessage = '';
      } else if (
        this.discountCode !== 'FIJO2' &&
        !this.discountServices.getAiballCode().alreadyUsed
      ) {
        this.discountAppliedMessage = `Código de descuento aplicado con éxito`;
        this.alreadyAppliedMessage = '';
      } else {
        this.alreadyAppliedMessage = 'Ya has utilizado AIBALL10 en esta compra';
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
      (total, item) => total + item.quantity * item.precio,
      0
    );

    return parseFloat(total.toFixed(2));
  }
  applyDiscount() {
    this.attemptedDiscount = true;
    const discountMap: { [key: string]: number } = {
      AIBALL10: 0.1,
      FIJO2: 2,
    };
    this.manageErrors();
    if (
      this.discountCode === 'AIBALL10' &&
      !this.discountServices.getAiballCode().alreadyUsed
    ) {
      this.appliedDiscount += this.getTotal() * discountMap['AIBALL10'];
      this.purchasedServices.updateFinalPrice(
        this.calculateTotalWithDiscount()
      );
      this.discountServices.getAiballCode().alreadyUsed = true;
    } else if (
      this.discountCode === 'FIJO2' &&
      this.discountServices.getFijoCode().maxUses > 0 &&
      !this.discountServices.getFijoCode().alreadyUsed
    ) {
      this.appliedDiscount = this.appliedDiscount || 0;
      this.appliedDiscount += discountMap['FIJO2'];
      this.discountServices.getFijoCode().maxUses--;
      this.purchasedServices.updateFinalPrice(
        this.calculateTotalWithDiscount()
      );
      this.discountServices.getFijoCode().alreadyUsed = true;
    } else {
    }

    this.discountCode = '';
  }
  calculateTotalWithDiscount(): number {
    return this.getTotal() - this.appliedDiscount;
  }
}
