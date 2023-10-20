import { Component, Input } from '@angular/core';
import { PadelProduct } from '@app/pages/product-list/services/product-list.model';

@Component({
  standalone: true,
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product: PadelProduct;

  ngOnInit(): void {
    console.log(this.product);
  }

  addToCart() {
    // Implementa la lógica para añadir el producto al carrito aquí
  }
}
