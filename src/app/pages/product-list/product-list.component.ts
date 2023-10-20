import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductListDataService } from './services/product-list-mock.service';
import { first } from 'rxjs';
import { ProductListResponse } from './services/product-list.model';
import { ProductCardComponent } from '@app/components/product-card/product-card.component';

@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [RouterModule, CommonModule, ProductCardComponent],
})
export class ProductListComponent {
  public productListResponse: any;

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
          console.log({ response });
          this.productListResponse = response;
        },
      });
  }
}
