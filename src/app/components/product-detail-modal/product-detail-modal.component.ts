import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PadelProduct } from '@app/pages/product-list/services/product-list.model';

@Component({
  standalone: true,
  selector: 'app-product-detail-modal',
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.scss'],
  imports: [CommonModule],
})
export class ProductDetailModalComponent {
  @Input() product: any;

  @Output() closeModalEvent = new EventEmitter<any>();

  public combinedData: any;
  ngOnInit() {
    this.combineDetails();
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  combineDetails() {
    this.combinedData = Object.keys(this.product.detalles).map((key) => {
      return {
        label: key,
        value: this.product.detalles[key],
      };
    });
  }
}
