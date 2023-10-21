import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PadelProduct } from '@app/pages/product-list/services/product-list.model';

@Component({
  standalone: true,
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  imports: [CommonModule],
})
export class ProductCardComponent {
  @Input() product: any;
  @Input() isInCart: boolean = false;

  @Output() addToCardEvent = new EventEmitter<any>();
  @Output() viewDetailsEvent = new EventEmitter<any>();
  @Output() removeFromCartEvent = new EventEmitter<any>();

  ngOnInit(): void {}

  addToCart(idProduct: number) {
    this.addToCardEvent.emit(idProduct);
    // Implementa la lógica para añadir el producto al carrito aquí
  }

  viewDetails(idProduct: number) {
    this.viewDetailsEvent.emit(idProduct);
  }

  removeFromCart(idProduct: number) {
    this.removeFromCartEvent.emit(idProduct);
  }
}
