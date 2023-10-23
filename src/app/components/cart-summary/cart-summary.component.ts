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
  fijo2DiscountUses: number = 3;
  attemptedDiscount = false; // Bandera para rastrear si se intentó aplicar un descuento
  showDiscountCodeError: boolean = false;
  showFijo2DiscountError: boolean = false;
  discountAppliedMessage: string = '';

  constructor(
    private cartService: CartService,
    private router: Router,
    private purchasedServices: PurchasedProductsService,
    private discountServices: DiscountService
  ) {} //ajddsjadksajdslka
  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.purchasedServices.updateFinalPrice(this.getTotal());
  }

  checkIfRegisteredDiscount() {
    const temp = discountsList.includes(this.discountCode);
    console.log({ temp }, this.discountCode);

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
        this.fijo2DiscountUses &&
        !this.discountServices.getFijoCode().alreadyUsed
      ) {
        this.discountAppliedMessage = `Código de descuento aplicado con éxito. Numero de usos restantes: ${
          this.fijo2DiscountUses - 1
        }`;
      } else if (
        this.discountCode === 'FIJO2' &&
        this.fijo2DiscountUses &&
        this.discountServices.getFijoCode().alreadyUsed
      ) {
        this.discountAppliedMessage = 'ya has utilizado fijo2 en esta compra';
      } else if (
        this.discountCode !== 'FIJO2' &&
        !this.discountServices.getAiballCode().alreadyUsed
      ) {
        this.discountAppliedMessage = `Código de descuento aplicado con éxito`;
      } else {
        this.discountAppliedMessage =
          'ya has utilizado AIBALL10 en esta compra';
      }
    }

    if (this.discountCode === 'FIJO2' && this.fijo2DiscountUses === 0) {
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
    console.log(this.fijo2DiscountUses);
    const discountMap: { [key: string]: number } = {
      AIBALL10: 0.1, // 10% de descuento
      FIJO2: 2, // Descuento de 2€
    };
    this.manageErrors();
    console.log(this.discountServices.getAiballCode().alreadyUsed);
    if (
      this.discountCode === 'AIBALL10' &&
      !this.discountServices.getAiballCode().alreadyUsed
    ) {
      this.appliedDiscount += this.getTotal() * discountMap['AIBALL10'];
      this.purchasedServices.updateFinalPrice(
        this.calculateTotalWithDiscount()
      );
      this.discountServices.setAiballCodeToUsed();
    } else if (
      this.discountCode === 'FIJO2' &&
      this.fijo2DiscountUses > 0 &&
      !this.discountServices.getFijoCode().alreadyUsed
    ) {
      this.appliedDiscount = this.appliedDiscount || 0; // Solo establece si no hay descuento previo
      this.appliedDiscount += discountMap['FIJO2'];
      this.fijo2DiscountUses -= 1;
      this.purchasedServices.updateFinalPrice(
        this.calculateTotalWithDiscount()
      );
      this.discountServices.setFijoCodeToUsed();
    } else {
      // No se establece appliedDiscount en 0 para mantener el descuento previo
      // Esto permite que los descuentos acumulados no se desapliquen al ingresar un nuevo código inválido
    }

    this.discountCode = ''; // Limpiar el campo de entrada
  }
  calculateTotalWithDiscount(): number {
    return this.getTotal() - this.appliedDiscount;
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
