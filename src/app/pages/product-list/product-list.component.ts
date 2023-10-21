import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductListDataService } from './services/product-list-mock.service';
import { first } from 'rxjs';
import {
  PadelProduct,
  ProductListResponse,
} from './services/product-list.model';
import { ProductCardComponent } from '@app/components/product-card/product-card.component';
import { ProductDetailModalComponent } from '@app/components/product-detail-modal/product-detail-modal.component';
import { useCartStore } from 'src/store/cartStore';

@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [
    RouterModule,
    CommonModule,
    ProductCardComponent,
    ProductDetailModalComponent,
  ],
})
export class ProductListComponent {
  public productListResponse: any;
  public showModal: boolean = false;
  public productDetailsToShow: PadelProduct;
  constructor(private _productListMockServices: ProductListDataService) {}

  ngOnInit(): void {
    this.getProductListFromService();
  }

  getProductListFromService() {
    this._productListMockServices
      .getLastSearchesData()
      .pipe(first())
      .subscribe({
        next: (response: ProductListResponse) => {
          this.productListResponse = response;
        },
      });
  }

  openProductDetailModal(id: number) {
    this.productDetailsToShow = this.productListResponse.find(
      (item: PadelProduct) => item.id === id
    );
    this.showModal = !this.showModal;
  }

  closeModal() {
    this.showModal = !this.showModal;
  }

  storeToCart(productToStore: any) {
    // this.addToCart(productToStore);
  }
}
