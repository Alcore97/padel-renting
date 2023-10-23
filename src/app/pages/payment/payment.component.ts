import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../cart/services/cart.service';
import { FormsModule } from '@angular/forms';
import { PurchasedProductsService } from '../purchased-products/services/purchased-products.service';

@Component({
  standalone: true,
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.sass'],
  imports: [RouterModule, FormsModule],
})
export class PaymentComponent {
  cardNumber: string = '';
  totalAmount: number = 0; // Variable para el monto total
  constructor(
    private router: Router,
    private cartService: CartService,
    private purchasedProductsService: PurchasedProductsService
  ) {}

  ngOnInit() {
    this.totalAmount = this.purchasedProductsService.totalAmount;
  }
  makePayment() {
    if (this.cardNumber === '1234567890123456') {
      const cartItems = this.cartService.getCartItems();

      // Proceso de pago exitoso, puedes realizar acciones adicionales aquí
      // Por ejemplo, agregar los productos comprados a una lista
      // y limpiar el carrito de compras
      cartItems.forEach((item) =>
        this.purchasedProductsService.addProduct(item)
      );

      // Luego, redirige al usuario a la lista de productos comprados
      this.router.navigate(['/purchased-products']);
    } else {
      alert('Tarjeta no válida. Por favor, intente con una tarjeta válida.');
    }
  }

  goToProductsList() {
    this.router.navigate(['/products']);
  }

  getTotal(): number {
    // Utiliza el servicio de carrito para obtener el monto total
    const cartItems = this.cartService.getCartItems();
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.precio,
      0
    );
  }
}
