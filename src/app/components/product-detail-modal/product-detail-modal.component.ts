import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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
    this.combinedData = Object.keys(this.product.detalls).map((key) => {
      return {
        label: key,
        value: this.product.detalls[key],
      };
    });
  }
}
