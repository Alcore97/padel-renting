import { Component } from '@angular/core';
import { PurchasedProductsService } from './services/purchased-products.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BottomNavbarComponent } from '@app/components/bottom-navbar/bottom-navbar.component';

@Component({
  standalone: true,
  selector: 'app-purchased-products',
  templateUrl: './purchased-products.component.html',
  styleUrls: ['./purchased-products.component.scss'],
  imports: [CommonModule, BottomNavbarComponent],
})
export class PurchasedProductsComponent {
  purchasedProducts: any[] = [];
  totalPaidAmount: number = 0;

  constructor(
    private purchasedProductsService: PurchasedProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener los productos comprados desde el servicio
    this.purchasedProducts =
      this.purchasedProductsService.getPurchasedProducts();
    console.log(this.purchasedProducts);

    // Calcular el monto total pagado
    this.totalPaidAmount = this.calculateTotalPaidAmount();
  }

  calculateTotalPaidAmount(): number {
    return this.purchasedProducts.reduce(
      (total, product) => total + product.quantity * product.precio,
      0
    );
  }

  goToProductsList() {
    this.router.navigate(['/products']);
  }
}
