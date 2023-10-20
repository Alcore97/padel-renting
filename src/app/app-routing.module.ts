import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { PreCheckoutComponent } from './pages/pre-checkout/pre-checkout.component';
import { PaymentComponent } from './pages/payment/payment.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta de inicio
  { path: 'products', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'precheckout', component: PreCheckoutComponent },
  { path: 'checkout', component: PaymentComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
